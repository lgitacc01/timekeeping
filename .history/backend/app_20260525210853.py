from flask import Flask, request, jsonify
from flask_cors import CORS

from pymongo import MongoClient
from bson.objectid import ObjectId

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# =========================
# MongoDB Atlas
# =========================

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)

db = client[DB_NAME]

users_collection = db["users"]

# =========================
# Routes
# =========================

@app.route("/")
def home():
    return {"message": "Flask MongoDB Atlas Running"}

# CREATE
@app.route("/api/users", methods=["POST"])
def create_user():

    data = request.json

    result = users_collection.insert_one({
        "name": data["name"],
        "age": data["age"]
    })

    return jsonify({
        "message": "User created",
        "id": str(result.inserted_id)
    })

# READ ALL
@app.route("/api/users", methods=["GET"])
def get_users():

    users = []

    for user in users_collection.find():

        users.append({
            "_id": str(user["_id"]),
            "name": user["name"],
            "age": user["age"]
        })

    return jsonify(users)

# DELETE
@app.route("/api/users/<id>", methods=["DELETE"])
def delete_user(id):

    users_collection.delete_one({
        "_id": ObjectId(id)
    })

    return jsonify({
        "message": "Deleted"
    })

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )