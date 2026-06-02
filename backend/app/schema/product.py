from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from app.schema.review import Review

class ProductBase(BaseModel):
    id: str
    name: str
    description: str
    long_description: Optional[str] = Field(None, serialization_alias="longDescription")
    price: float
    original_price: Optional[float] = Field(None, serialization_alias="originalPrice")
    rating: float
    reviews_count: int = Field(..., serialization_alias="reviewsCount")
    image: str
    images: List[str]
    specs: dict
    in_stock: bool = Field(..., serialization_alias="inStock")
    stock_count: int = Field(..., serialization_alias="stockCount")
    variants: Optional[List[str]] = None
    badge: Optional[str] = None

class ProductCreate(ProductBase):
    category_id: str

class Product(ProductBase):
    category: str
    category_label: str = Field(..., serialization_alias="categoryLabel")
    reviews: List[Review] = []

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    @classmethod
    def model_validate(cls, obj, **kwargs):
        # Resolve category fields from relationship safely without triggering lazy loading
        category_id = getattr(obj, "category_id", "")
        category_label = ""
        if "category" in obj.__dict__ and obj.category is not None:
            category_label = obj.category.label
            category_id = obj.category.id

        # Safely convert Reviews list if it has been loaded
        reviews_list = []
        if "reviews" in obj.__dict__ and obj.reviews:
            reviews_list = [Review.model_validate(r) for r in obj.reviews]

        data = {
            "id": obj.id,
            "name": obj.name,
            "description": obj.description,
            "long_description": obj.long_description,
            "price": float(obj.price) if obj.price is not None else 0.0,
            "original_price": float(obj.original_price) if obj.original_price is not None else None,
            "rating": float(obj.rating) if obj.rating is not None else 5.0,
            "reviews_count": obj.reviews_count,
            "image": obj.image,
            "images": obj.images,
            "specs": obj.specs,
            "in_stock": obj.in_stock,
            "stock_count": obj.stock_count,
            "variants": obj.variants,
            "badge": obj.badge,
            "category": category_id,
            "category_label": category_label,
            "reviews": reviews_list
        }
        return cls(**data)
