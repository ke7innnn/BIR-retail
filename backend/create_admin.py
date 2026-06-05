import argparse
import asyncio
from sqlalchemy import select
from app.database.session import AsyncSessionLocal
from app.models.admin import Admin
from app.core.security import hash_password

async def create_admin(email: str, password: str, full_name: str):
    async with AsyncSessionLocal() as session:
        # Check if admin already exists
        result = await session.execute(select(Admin).where(Admin.email == email))
        existing_admin = result.scalar_one_or_none()
        
        if existing_admin:
            print(f"Error: Admin with email '{email}' already exists.")
            return

        # Create new admin
        admin = Admin(
            email=email,
            password_hash=hash_password(password),
            full_name=full_name
        )
        session.add(admin)
        await session.commit()
        print(f"Admin '{full_name}' ({email}) created successfully!")

def main():
    parser = argparse.ArgumentParser(description="Create a system administrator account.")
    parser.add_argument("--email", required=True, help="Admin email address")
    parser.add_argument("--password", required=True, help="Admin password")
    parser.add_argument("--name", required=True, help="Admin full name")
    
    args = parser.parse_args()
    asyncio.run(create_admin(args.email, args.password, args.name))

if __name__ == "__main__":
    main()
