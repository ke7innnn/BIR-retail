from pydantic import BaseModel, ConfigDict

class CategoryBase(BaseModel):
    id: str
    name: str
    label: str
    description: str
    icon_name: str
    image: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    model_config = ConfigDict(from_attributes=True)
