from pydantic import BaseModel, ConfigDict, Field

class ReviewBase(BaseModel):
    id: str
    user_name: str = Field(..., serialization_alias="userName", validation_alias="userName")
    rating: int
    date: str
    comment: str

class ReviewCreate(ReviewBase):
    product_id: str = Field(..., serialization_alias="productId", validation_alias="productId")

class Review(ReviewBase):
    product_id: str = Field(..., serialization_alias="productId", validation_alias="productId")
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
