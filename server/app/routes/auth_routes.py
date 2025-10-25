from flask import Blueprint, request, jsonify
from app import db, bcrypt, jwt
from app.models import User
from app.schemas import UserSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import ValidationError
import random
import string

auth_bp = Blueprint('auth_bp', __name__)
user_schema = UserSchema()

def generate_username(full_name):
    base_username = f"CUS-{full_name.split(' ')[0]}-".lower()
    while True:
        random_suffix = ''.join(random.choices(string.digits, k=4))
        username = base_username + random_suffix
        if not User.query.filter_by(username=username).first():
            return username

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not all(k in data for k in ["full_name", "email", "password"]):
            return jsonify({"message": "Missing required fields"}), 400

    except Exception as e:
        return jsonify({"message": "Invalid JSON"}), 400

    full_name = data['full_name']
    email = data['email']
    password = data['password']
    phone_number = data.get('phone_number')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 409

    username = generate_username(full_name)

    new_user = User(
        username=username,
        full_name=full_name,
        email=email,
        phone_number=phone_number,
    )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token, user=user_schema.dump(new_user)), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, user=user_schema.dump(user)), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello {user.username}! You are authenticated.'}), 200
