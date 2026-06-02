from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.models.hero_slide import HeroSlide as HeroSlideModel
from app.schema.hero_slide import HeroSlide as HeroSlideSchema

router = APIRouter(prefix="/promotions", tags=["promotions"])

@router.get("/hero", response_model=List[HeroSlideSchema])
async def read_hero_slides(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(HeroSlideModel)
        .filter(HeroSlideModel.is_active == True)
        .order_by(HeroSlideModel.sort_order.asc())
    )
    result = await db.execute(stmt)
    slides = result.scalars().all()
    return slides
