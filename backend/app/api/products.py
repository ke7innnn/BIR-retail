from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.models.product import Product as ProductModel
from app.schema.product import Product as ProductSchema

router = APIRouter(prefix="/products", tags=["products"])

@router.get("", response_model=List[ProductSchema])
async def read_products(category: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    # Use joinedload to fetch the Category eagerly to prevent async lazy-loading exceptions
    stmt = select(ProductModel).options(joinedload(ProductModel.category))
    if category:
        stmt = stmt.filter(ProductModel.category_id == category)
        
    result = await db.execute(stmt)
    products = result.scalars().all()
    
    return [ProductSchema.model_validate(p) for p in products]

@router.get("/{product_id}", response_model=ProductSchema)
async def read_product(product_id: str, db: AsyncSession = Depends(get_db)):
    # Use joinedload for Category and selectinload for Reviews list
    stmt = (
        select(ProductModel)
        .options(joinedload(ProductModel.category), selectinload(ProductModel.reviews))
        .filter(ProductModel.id == product_id)
    )
    result = await db.execute(stmt)
    product = result.scalar_one_or_none()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return ProductSchema.model_validate(product)
