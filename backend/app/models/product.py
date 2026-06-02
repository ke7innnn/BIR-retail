from typing import List, Optional
from sqlalchemy import String, Text, Numeric, Integer, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.session import Base

class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    long_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    original_price: Mapped[Optional[float]] = mapped_column(Numeric(10, 2), nullable=True)
    rating: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False, default=5.0)
    reviews_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    image: Mapped[str] = mapped_column(String, nullable=False)
    images: Mapped[list] = mapped_column(JSONB, nullable=False, default=list)
    category_id: Mapped[str] = mapped_column(String, ForeignKey("categories.id"), nullable=False)
    specs: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    in_stock: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    stock_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    variants: Mapped[Optional[list]] = mapped_column(JSONB, nullable=True, default=list)
    badge: Mapped[Optional[str]] = mapped_column(String, nullable=True)

    category = relationship("Category")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan")
