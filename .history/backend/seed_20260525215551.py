from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

users = db["users"]

if users.count_documents({}) == 0:
    users.insert_many([
        {
            "username": "boss",
            "password": "123",
            "role": "manager",
            "full_name": "Nguyen Van Sep"
        },
        {
            "username": "long",
            "password": "123",
            "role": "employee",
            "full_name": "Ly Hoang Long"
        },
        {
            "username": "nv1",
            "password": "123",
            "role": "employee",
            "full_name": "Tran Van A"
        }
    ])

    print("Seed thành công")
else:
    print("Data đã tồn tại")