from flask import Flask, request, jsonify
from flask_cors import CORS

from pymongo import MongoClient
from bson.objectid import ObjectId

from dotenv import load_dotenv

from datetime import datetime

import os

load_dotenv()

app = Flask(__name__)

CORS(app)

# =========================
# MongoDB
# =========================

client = MongoClient(os.getenv("MONGO_URI"))

db = client[os.getenv("DB_NAME")]

users_collection = db["users"]
attendance_collection = db["attendance"]

# =========================
# LOGIN
# =========================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({
        "username": username,
        "password": password
    })

    if not user:
        return jsonify({
            "message": "Sai tài khoản hoặc mật khẩu"
        }), 401

    return jsonify({
        "_id": str(user["_id"]),
        "username": user["username"],
        "name": user["name"],
        "role": user["role"]
    })

# =========================
# CHECKIN
# =========================

@app.route("/api/checkin", methods=["POST"])
def checkin():

    data = request.json

    user_id = data.get("user_id")

    today = datetime.now().strftime("%Y-%m-%d")
    current_time = datetime.now().strftime("%H:%M:%S")

    existed = attendance_collection.find_one({
        "user_id": user_id,
        "date": today
    })

    if existed:
        return jsonify({
            "message": "Hôm nay đã chấm công"
        }), 400

    attendance_collection.insert_one({
        "user_id": user_id,
        "date": today,
        "time": current_time,
        "created_at": datetime.now()
    })

    return jsonify({
        "message": "Chấm công thành công"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)