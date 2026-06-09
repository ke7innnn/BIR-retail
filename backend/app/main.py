from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.categories import router as categories_router
from app.api.products import router as products_router
from app.api.promotions import router as promotions_router
from app.api.auth import router as auth_router
from app.database.session import Base, engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Async database table creation at startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="BIR-retail API", version="1.0.0", lifespan=lifespan)

# CORS config to allow local frontend access (typically Next.js on port 3000)
origins = [
    "http://localhost:3000",
    "https://nexonalabs.com",
    "https://www.nexonalabs.com",
    "https://bir.nexonalabs.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(categories_router, prefix="/api")
app.include_router(products_router, prefix="/api")
app.include_router(promotions_router, prefix="/api")
app.include_router(auth_router, prefix="/api")

@app.get("/")
def read_root():
    return {"status": "online", "message": "BIR-retail e-commerce API"}

