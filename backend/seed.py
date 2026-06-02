import os
import re
import json
import asyncio
from minio import Minio
from sqlalchemy import delete
from app.core.config import settings
from app.database.session import AsyncSessionLocal, Base, engine
from app.models.category import Category
from app.models.product import Product
from app.models.review import Review
from app.models.hero_slide import HeroSlide

# Standard public read policy for MinIO bucket
def get_public_read_policy(bucket_name: str) -> str:
    return json.dumps({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {"AWS": ["*"]},
                "Action": ["s3:GetObject"],
                "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
            }
        ]
    })

def clean_ts_json(raw_js: str) -> str:
    # Remove single line comments (ignoring // in http:// or https://)
    cleaned = re.sub(r'(?<!:)\/\/.*', '', raw_js)
    # Remove trailing commas in lists/objects before closing brackets
    cleaned = re.sub(r',\s*([\]}])', r'\1', cleaned)
    return cleaned

def parse_ts_data(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex find CATEGORIES and PRODUCTS arrays
    cat_match = re.search(r'export const CATEGORIES:\s*\w+\[\]\s*=\s*(\[.*?\]);', content, re.DOTALL)
    prod_match = re.search(r'export const PRODUCTS:\s*\w+\[\]\s*=\s*(\[.*?\]);', content, re.DOTALL)

    if not cat_match or not prod_match:
        raise ValueError("Could not extract CATEGORIES or PRODUCTS arrays from TypeScript file.")

    categories_raw = clean_ts_json(cat_match.group(1))
    products_raw = clean_ts_json(prod_match.group(1))

    categories = json.loads(categories_raw)
    products = json.loads(products_raw)

    return categories, products

# Static mock reviews generator for seeding
MOCK_REVIEWS_TEMPLATES = [
    {"userName": "Rajesh M.", "rating": 5, "comment": "Absolutely premium quality! The size is huge, uniform, and they are incredibly crisp. Best I've ordered online."},
    {"userName": "Ananya S.", "rating": 5, "comment": "Top tier quality, FSSAI certified sorting is obvious. Zero bitter pieces, vacuum-sealed canister is very handy."},
    {"userName": "Rohit G.", "rating": 5, "comment": "Super light, roasted perfectly and seasoning is delicious! Perfect high-protein snack for weight loss."},
    {"userName": "Priya D.", "rating": 4, "comment": "Crispiest packaging I've ever bought. Delivered completely fresh canisters."},
    {"userName": "Vikram K.", "rating": 5, "comment": "The seasoning is spot on! Roasted perfectly, not too oily, absolute daily crunch champion."}
]

HERO_SLIDES_STATIC = [
    {
        "subtitle": "India's Fastest Growing Dryfruits Brand",
        "title": "Premium California Almonds",
        "description": "Sourced from pristine orchards, our classic almonds are packed with heart-healthy oils, vitamin E, and a supreme crisp crunch. Free airtight container included with our 1 KG saver pack!",
        "image": "/images/products/california-almonds-1-kg.jpg",
        "ctaLink": "/product/california-almonds-1-kg",
        "sortOrder": 1
    },
    {
        "subtitle": "Exquisite Festive Gifting",
        "title": "Mandala Premium Gift Trays",
        "description": "Give the gift of healthy, gourmet snacking. A beautiful premium pack containing five of our finest dry fruit varieties cocooned in a spectacular gold-patterned chakra sleeve.",
        "image": "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg",
        "ctaLink": "/product/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves",
        "sortOrder": 2
    },
    {
        "subtitle": "Gourmet Savory Bites",
        "title": "Crazy Cashews Pepper & Pink Salt",
        "description": "Jumbo slow-roasted cashews gently seasoned with pure Himalayan pink salt and cracked black pepper. The perfect umami-rich companion for daily crunching.",
        "image": "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg",
        "ctaLink": "/product/crazy-cashew-black-pepper-salt-flavour-100g",
        "sortOrder": 3
    }
]

# Circular categories previews matching frontend
CIRCULAR_CAT_IMAGES = {
    "classic": "/images/products/california-almonds-1-kg.jpg",
    "crazy-bites": "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg",
    "makhana": "/images/products/makhana-masti-peri-peri.jpg",
    "exotic-fruits": "/images/products/silver-leaf-honey-200g.jpg",
    "gift-hampers": "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg"
}

async def seed():
    # 1. Initialize Tables Async
    print("Initializing database tables asynchronously...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    db = AsyncSessionLocal()

    # Clear existing tables first to prevent foreign key constraint issues on re-runs
    print("Clearing old database records...")
    await db.execute(delete(Review))
    await db.execute(delete(Product))
    await db.execute(delete(Category))
    await db.execute(delete(HeroSlide))
    await db.commit()

    # 2. Setup MinIO Client
    print(f"Connecting to MinIO at {settings.MINIO_ENDPOINT}...")
    minio_client = Minio(
        settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
        secure=settings.MINIO_SECURE
    )

    # 3. Create public bucket
    bucket = settings.MINIO_BUCKET
    if not minio_client.bucket_exists(bucket):
        print(f"Creating bucket '{bucket}'...")
        minio_client.make_bucket(bucket)
        minio_client.set_bucket_policy(bucket, get_public_read_policy(bucket))
    else:
        print(f"Bucket '{bucket}' already exists.")

    # Paths setup
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend"))
    ts_file = os.path.join(frontend_dir, "src", "data", "products.ts")
    public_dir = os.path.join(frontend_dir, "public")

    if not os.path.exists(ts_file):
        print(f"Error: Could not locate frontend TS data at {ts_file}")
        return

    # Parse Categories and Products
    print("Parsing frontend static data...")
    categories_data, products_data = parse_ts_data(ts_file)

    def upload_to_minio(local_path: str, object_name: str) -> str:
        normalized_local = os.path.normpath(local_path)
        if not os.path.exists(normalized_local):
            print(f"Warning: Image file not found at {normalized_local}")
            return ""
        
        # Upload using sync API (totally fine for seed script setup)
        print(f"Uploading {object_name} to MinIO...")
        minio_client.fput_object(bucket, object_name, normalized_local)
        
        # Build external URL
        return f"{settings.MINIO_EXTERNAL_ENDPOINT}/{bucket}/{object_name}"

    # 4. Seed Categories
    print("Seeding categories...")
    for cat_data in categories_data:
        cat_id = cat_data["id"]

        # Circular image for this category
        frontend_img_path = CIRCULAR_CAT_IMAGES.get(cat_id, "/images/products/california-almonds-1-kg.jpg")
        if frontend_img_path.startswith(("http://", "https://")):
            minio_url = frontend_img_path
        else:
            local_img = os.path.join(public_dir, frontend_img_path.lstrip("/"))
            minio_url = upload_to_minio(local_img, f"categories/{cat_id}.jpg")

        db_cat = Category(
            id=cat_id,
            name=cat_data["name"],
            label=cat_data["label"],
            description=cat_data["description"],
            icon_name=cat_data["iconName"],
            image=minio_url
        )
        db.add(db_cat)
    await db.commit()

    # 5. Seed Products & Reviews
    print("Seeding products & reviews...")
    for idx, prod_data in enumerate(products_data):
        prod_id = prod_data["id"]

        # Upload main image
        main_img_path = prod_data["image"]
        if main_img_path.startswith(("http://", "https://")):
            main_minio_url = main_img_path
        else:
            local_main_img = os.path.join(public_dir, main_img_path.lstrip("/"))
            main_minio_url = upload_to_minio(local_main_img, f"products/{prod_id}/main.jpg")

        # Upload gallery images
        gallery_urls = []
        for g_idx, g_img in enumerate(prod_data.get("images", [])):
            if g_img.startswith(("http://", "https://")):
                gallery_urls.append(g_img)
            else:
                local_g_img = os.path.join(public_dir, g_img.lstrip("/"))
                g_url = upload_to_minio(local_g_img, f"products/{prod_id}/gallery_{g_idx}.jpg")
                if g_url:
                    gallery_urls.append(g_url)

        # Build product
        db_prod = Product(
            id=prod_id,
            name=prod_data["name"],
            description=prod_data["description"],
            long_description=prod_data.get("longDescription"),
            price=prod_data["price"],
            original_price=prod_data.get("originalPrice"),
            rating=prod_data.get("rating", 5.0),
            reviews_count=prod_data.get("reviewsCount", 0),
            image=main_minio_url,
            images=gallery_urls,
            category_id=prod_data["category"],
            specs=prod_data["specs"],
            in_stock=prod_data["inStock"],
            stock_count=prod_data["stockCount"],
            variants=prod_data.get("variants", []),
            badge=prod_data.get("badge")
        )
        db.add(db_prod)

        # Generate reviews
        num_reviews = min(5, prod_data.get("reviewsCount", 3))
        for r_idx in range(num_reviews):
            template = MOCK_REVIEWS_TEMPLATES[r_idx % len(MOCK_REVIEWS_TEMPLATES)]
            db_review = Review(
                id=f"rev-{prod_id}-{r_idx}",
                product_id=prod_id,
                user_name=template["userName"],
                rating=template["rating"],
                date="May 24, 2026",
                comment=template["comment"]
            )
            db.add(db_review)

    await db.commit()

    # 6. Seed Hero Banners
    print("Seeding Hero Slides...")
    for s_idx, slide_data in enumerate(HERO_SLIDES_STATIC):
        slide_img_path = slide_data["image"]
        if slide_img_path.startswith(("http://", "https://")):
            slide_minio_url = slide_img_path
        else:
            local_slide_img = os.path.join(public_dir, slide_img_path.lstrip("/"))
            slide_minio_url = upload_to_minio(local_slide_img, f"hero/slide_{s_idx}.jpg")

        db_slide = HeroSlide(
            subtitle=slide_data["subtitle"],
            title=slide_data["title"],
            description=slide_data["description"],
            image=slide_minio_url,
            cta_link=slide_data["ctaLink"],
            sort_order=slide_data["sortOrder"],
            is_active=True
        )
        db.add(db_slide)

    await db.commit()
    await db.close()
    print("Database and MinIO seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
