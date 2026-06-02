from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.models.category import Category as CategoryModel
from app.schema.category import Category as CategorySchema

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("", response_model=List[CategorySchema])
async def read_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CategoryModel))
    categories = result.scalars().all()
    return categories
