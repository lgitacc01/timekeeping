from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client[os.getenv("DB_NAME")]

users_collection = db["users"]

users_collection.delete_many({})

users_collection.insert_many([
    {
        "username": "boss",
        "password": "123",
        "name": "Sếp Tổng",
        "role": "boss"
    },
    {
        "username": "long",
        "password": "123",
        "name": "Long",
        "role": "employee"
    },
    {
        "username": "nam",
        "password": "123",
        "name": "Nam",
        "role": "employee"
    }
])

print("Seed data success")