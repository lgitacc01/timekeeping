from flask import Flask, request, jsonify
from flask_cors import CORS


from pymongo import MongoClient
from dotenv import load_dotenv

from datetime import datetime
import pytz

import os

load_dotenv()

app = Flask(__name__)

CORS(app)

# ========================
# MongoDB
# ========================

client = MongoClient(os.getenv("MONGO_URI"))

db = client[os.getenv("DB_NAME")]

users_collection = db["users"]
attendance_collection = db["attendance"]

# ========================
# Login
# ========================

@app.route("/login", methods=["POST"])
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
        "message": "Đăng nhập thành công",
        "user": {
            "username": user["username"],
            "role": user["role"],
            "full_name": user["full_name"]
        }
    })

# ========================
# Check in
# ========================

@app.route("/checkin", methods=["POST"])
def checkin():

    data = request.json

    username = data.get("username")

    # ======================
    # Timezone Việt Nam
    # ======================

    vietnam_tz = pytz.timezone("Asia/Ho_Chi_Minh")

    now = datetime.now(vietnam_tz)

    today = now.strftime("%Y-%m-%d")

    current_time = now.strftime("%H:%M:%S")

    full_datetime = now.strftime("%Y-%m-%d %H:%M:%S")

    # ======================
    # Check đã chấm chưa
    # ======================

    existing = attendance_collection.find_one({
        "username": username,
        "date": today
    })

    if existing:
        return jsonify({
            "message": "Hôm nay đã chấm công"
        }), 400

    # ======================
    # Save MongoDB
    # ======================

    attendance_collection.insert_one({

        "username": username,

        "date": today,

        "time": current_time,

        "full_datetime": full_datetime,

        "created_at": now

    })

    # ======================
    # Response
    # ======================

    return jsonify({

    "message": "Chấm công thành công",

    "date": today,

    "time": current_time,

    "full_datetime": full_datetime,

    "display": f"Ngày {today} lúc {current_time}"

})
# ========================
# Attendance user
# ========================

@app.route("/attendance/<username>", methods=["GET"])
def attendance(username):

    records = list(
        attendance_collection.find(
            {
                "username": username
            },
            {
                "_id": 0
            }
        )
    )

    return jsonify(records)

# ========================
# Manager dashboard
# ========================

@app.route("/manager-dashboard", methods=["GET"])
def manager_dashboard():

    today = datetime.now().strftime("%Y-%m-%d")

    users = list(
        users_collection.find(
            {},
            {
                "_id": 0,
                "password": 0
            }
        )
    )

    result = []

    for user in users:

        attendance = attendance_collection.find_one({
            "username": user["username"],
            "date": today
        })

        result.append({

    "username": user["username"],

    "full_name": user["full_name"],

    "role": user["role"],

    "checked_in": attendance is not None,

    "time": attendance["time"] if attendance else None,

    "date": attendance["date"] if attendance else None

})

    return jsonify(result)

# ========================
# Run
# ========================
@app.route("/")
def home():
    return "Backend running..."

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )