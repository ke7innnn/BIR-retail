import os
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

# Categories specified by user
CATEGORIES = [
    {
        "id": "dates",
        "name": "dates",
        "label": "Dates",
        "description": "Premium sweet and nutrient-rich dates sourced from the finest orchards.",
        "icon_name": "Calendar",
        "image_file": "dates.jpeg"
    },
    {
        "id": "walnut",
        "name": "walnut",
        "label": "Walnuts",
        "description": "Crispy and heart-healthy premium walnut kernels.",
        "icon_name": "Activity",
        "image_file": "walnut.jpeg"
    },
    {
        "id": "almond",
        "name": "almond",
        "label": "Almonds",
        "description": "High-quality premium California almonds packed with nutrition.",
        "icon_name": "Heart",
        "image_file": "almonds.jpeg"
    },
    {
        "id": "cashews",
        "name": "cashews",
        "label": "Cashews",
        "description": "Slow-roasted and perfectly salted premium cashews.",
        "icon_name": "Sun",
        "image_file": "cashews.jpeg"
    }
]

# Products specified by user (one product for each category)
PRODUCTS = [
    {
        "id": "omani-seedless-dates",
        "name": "Omani Seedless Dates",
        "description": "Premium sweet and natural seedless dates from Oman. Perfect healthy substitute for refined sugar.",
        "long_description": "Our premium Omani Seedless Dates are carefully harvested, sorted, and packed to ensure the highest moisture, sweetness, and soft texture. Extremely rich in fiber, potassium, and natural antioxidants.",
        "price": 350.00,
        "original_price": 400.00,
        "rating": 4.8,
        "reviews_count": 3,
        "category_id": "dates",
        "image_file": "dates.jpeg",
        "specs": {"Weight": "500g", "Origin": "Oman", "Type": "Seedless", "Shelf Life": "6 Months"},
        "in_stock": True,
        "stock_count": 120,
        "variants": ["500g", "1kg"],
        "badge": "Best Seller"
    },
    {
        "id": "premium-walnut-kernels",
        "name": "Premium Walnut Kernels",
        "description": "Halves of light-colored, extra crispy walnut kernels from Kashmir. Rich in Omega-3.",
        "long_description": "Our Premium Walnut Kernels are vacuum sealed to preserve their natural flavor, light color, and crunch. Excellent source of brain-healthy Omega-3 fatty acids, antioxidants, and minerals.",
        "price": 650.00,
        "original_price": 750.00,
        "rating": 4.9,
        "reviews_count": 4,
        "category_id": "walnut",
        "image_file": "walnut.jpeg",
        "specs": {"Weight": "500g", "Origin": "Kashmir", "Type": "Kernels / Halves", "Shelf Life": "6 Months"},
        "in_stock": True,
        "stock_count": 85,
        "variants": ["250g", "500g", "1kg"],
        "badge": "Premium Quality"
    },
    {
        "id": "california-almonds",
        "name": "Premium California Almonds",
        "description": "Extra bold, crisp, and fresh California almonds. Sourced from the finest orchards.",
        "long_description": "These California Almonds are 100% natural, crisp, and high in protein and fiber. Perfect for soaking overnight, daily snacking, or adding to your favorite breakfast bowls.",
        "price": 450.00,
        "original_price": 500.00,
        "rating": 4.7,
        "reviews_count": 5,
        "category_id": "almond",
        "image_file": "almonds.jpeg",
        "specs": {"Weight": "500g", "Origin": "California", "Type": "Whole", "Shelf Life": "6 Months"},
        "in_stock": True,
        "stock_count": 150,
        "variants": ["500g", "1kg"],
        "badge": "Daily Essential"
    },
    {
        "id": "roasted-cashews",
        "name": "Roasted & Salted Cashews",
        "description": "Slow-roasted jumbo cashews seasoned with a pinch of salt. Incredibly creamy and crunchy.",
        "long_description": "Our Roasted & Salted Cashews are processed in small batches. Slow-roasted to bring out their natural sweet-creamy flavor and tossed with a hint of salt for the perfect savory snack.",
        "price": 500.00,
        "original_price": 580.00,
        "rating": 4.8,
        "reviews_count": 3,
        "category_id": "cashews",
        "image_file": "cashews.jpeg",
        "specs": {"Weight": "500g", "Origin": "Mangalore", "Type": "Roasted & Salted", "Shelf Life": "6 Months"},
        "in_stock": True,
        "stock_count": 95,
        "variants": ["250g", "500g"],
        "badge": "Popular Snack"
    }
]

# Hero Banners linked to the new products
HERO_SLIDES = [
    {
        "subtitle": "Naturally Sweet & Soft",
        "title": "Omani Seedless Dates",
        "description": "Handpicked seedless dates from Oman, packed with energy, fibers, and iron. The perfect natural sweetener for your daily diet.",
        "image_file": "dates.jpeg",
        "cta_link": "/product/omani-seedless-dates",
        "sort_order": 1
    },
    {
        "subtitle": "Brain-Boosting Nutrition",
        "title": "Kashmiri Walnut Kernels",
        "description": "Light, crispy halves rich in Omega-3 fatty acids and antioxidants. Vacuum sealed to retain absolute freshness.",
        "image_file": "walnut.jpeg",
        "cta_link": "/product/premium-walnut-kernels",
        "sort_order": 2
    },
    {
        "subtitle": "Premium Snacking Champion",
        "title": "California Almonds Saver Pack",
        "description": "Supreme size, bold crunch California almonds. Loaded with Vitamin E, protein, and heart-healthy fats.",
        "image_file": "almonds.jpeg",
        "cta_link": "/product/california-almonds",
        "sort_order": 3
    }
]

# Static mock reviews generator for seeding
MOCK_REVIEWS_TEMPLATES = [
    {"userName": "Rajesh M.", "rating": 5, "comment": "Absolutely premium quality! The size is huge, uniform, and they are incredibly crisp. Best I've ordered online."},
    {"userName": "Ananya S.", "rating": 5, "comment": "Top tier quality, FSSAI certified sorting is obvious. Zero bitter pieces, vacuum-sealed canister is very handy."},
    {"userName": "Rohit G.", "rating": 5, "comment": "Super light, roasted perfectly and seasoning is delicious! Perfect high-protein snack for daily munching."},
    {"userName": "Priya D.", "rating": 4, "comment": "Crispiest packaging I've ever bought. Delivered completely fresh canisters."},
    {"userName": "Vikram K.", "rating": 5, "comment": "The seasoning is spot on! Roasted perfectly, not too oily, absolute daily crunch champion."}
]

def find_image_file(filename: str) -> str:
    """Check VPS static directories first, then look locally in project structure."""
    paths_to_check = [
        os.path.join("/opt/services/static/images", filename),
        os.path.join("..", "frontend", "public", "images", "products", filename),
        os.path.join("..", "frontend", "public", "images", filename),
        os.path.join(".", filename),
        os.path.join(".", "static", "images", filename),
    ]
    for path in paths_to_check:
        abs_path = os.path.abspath(path)
        if os.path.exists(abs_path):
            print(f"Found image '{filename}' at {abs_path}")
            return abs_path
    
    print(f"Warning: Image file '{filename}' not found in any search paths.")
    return ""

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

    # 3. Create or Clear Bucket
    bucket = settings.MINIO_BUCKET
    if minio_client.bucket_exists(bucket):
        print(f"Bucket '{bucket}' already exists. Clearing all objects in bucket...")
        try:
            objects_to_delete = minio_client.list_objects(bucket, recursive=True)
            for obj in objects_to_delete:
                print(f"Deleting object '{obj.object_name}' from MinIO...")
                minio_client.remove_object(bucket, obj.object_name)
        except Exception as e:
            print(f"Error clearing bucket: {e}")
    else:
        print(f"Creating bucket '{bucket}'...")
        minio_client.make_bucket(bucket)
        minio_client.set_bucket_policy(bucket, get_public_read_policy(bucket))

    # Helper function to upload an image file
    def upload_to_minio(image_filename: str, object_name: str) -> str:
        local_path = find_image_file(image_filename)
        if not local_path:
            return ""
        
        print(f"Uploading {image_filename} to MinIO as {object_name}...")
        minio_client.fput_object(bucket, object_name, local_path)
        
        # Build external URL
        return f"{settings.MINIO_EXTERNAL_ENDPOINT}/{bucket}/{object_name}"

    # 4. Seed Categories
    print("Seeding categories...")
    category_urls = {}
    for cat_data in CATEGORIES:
        cat_id = cat_data["id"]
        minio_url = upload_to_minio(cat_data["image_file"], f"categories/{cat_id}.jpg")
        category_urls[cat_id] = minio_url

        db_cat = Category(
            id=cat_id,
            name=cat_data["name"],
            label=cat_data["label"],
            description=cat_data["description"],
            icon_name=cat_data["icon_name"],
            image=minio_url
        )
        db.add(db_cat)
    await db.commit()

    # 5. Seed Products & Reviews
    print("Seeding products & reviews...")
    for prod_data in PRODUCTS:
        prod_id = prod_data["id"]
        main_minio_url = upload_to_minio(prod_data["image_file"], f"products/{prod_id}/main.jpg")

        # Build product
        db_prod = Product(
            id=prod_id,
            name=prod_data["name"],
            description=prod_data["description"],
            long_description=prod_data.get("long_description"),
            price=prod_data["price"],
            original_price=prod_data.get("original_price"),
            rating=prod_data.get("rating", 5.0),
            reviews_count=prod_data.get("reviews_count", 0),
            image=main_minio_url,
            images=[main_minio_url],  # Single item gallery containing the main image
            category_id=prod_data["category_id"],
            specs=prod_data["specs"],
            in_stock=prod_data["in_stock"],
            stock_count=prod_data["stock_count"],
            variants=prod_data.get("variants", []),
            badge=prod_data.get("badge")
        )
        db.add(db_prod)

        # Generate reviews
        num_reviews = min(5, prod_data.get("reviews_count", 3))
        for r_idx in range(num_reviews):
            template = MOCK_REVIEWS_TEMPLATES[r_idx % len(MOCK_REVIEWS_TEMPLATES)]
            db_review = Review(
                id=f"rev-{prod_id}-{r_idx}",
                product_id=prod_id,
                user_name=template["userName"],
                rating=template["rating"],
                date="Jun 03, 2026",
                comment=template["comment"]
            )
            db.add(db_review)

    await db.commit()

    # 6. Seed Hero Banners
    print("Seeding Hero Slides...")
    for s_idx, slide_data in enumerate(HERO_SLIDES):
        slide_minio_url = upload_to_minio(slide_data["image_file"], f"hero/slide_{s_idx}.jpg")

        db_slide = HeroSlide(
            subtitle=slide_data["subtitle"],
            title=slide_data["title"],
            description=slide_data["description"],
            image=slide_minio_url,
            cta_link=slide_data["cta_link"],
            sort_order=slide_data["sort_order"],
            is_active=True
        )
        db.add(db_slide)

    await db.commit()
    await db.close()
    print("Database and MinIO seeding completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
