from pydantic import BaseModel, ConfigDict, Field

class HeroSlideBase(BaseModel):
    subtitle: str
    title: str
    description: str
    image: str
    cta_link: str = Field(..., serialization_alias="ctaLink")
    sort_order: int = Field(0, serialization_alias="sortOrder")
    is_active: bool = Field(True, serialization_alias="isActive")

class HeroSlideCreate(HeroSlideBase):
    pass

class HeroSlide(HeroSlideBase):
    id: int
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
