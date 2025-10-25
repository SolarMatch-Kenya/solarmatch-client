from flask import Blueprint, request, jsonify
from app import db
from app.models import User, UserInstaller
from app.schemas import UserSchema, UserInstallerSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

user_bp = Blueprint('user_bp', __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_installer_schema = UserInstallerSchema()
user_installers_schema = UserInstallerSchema(many=True)

@user_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id: # Allow users to view their own profile
        # In a real app, you might allow admins to view any user profile
        return jsonify({'message': 'Unauthorized to view this user profile'}), 403

    user = User.query.get_or_404(id)
    return jsonify(user_schema.dump(user)), 200

@user_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'message': 'Unauthorized to update this user profile'}), 403

    user = User.query.get_or_404(id)

    try:
        user_data = user_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in user_data.items():
        setattr(user, key, value)

    db.session.commit()
    return jsonify({'message': 'User profile updated successfully', 'user': user_schema.dump(user)}), 200

@user_bp.route('/<int:id>/leads', methods=['GET'])
@jwt_required()
def get_user_leads(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'message': 'Unauthorized to view these leads'}), 403

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    leads = UserInstaller.query.filter_by(user_id=id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'leads': user_installers_schema.dump(leads.items),
        'total_pages': leads.pages,
        'current_page': leads.page,
        'total_items': leads.total
    }), 200

@user_bp.route('/<int:user_id>/leads/<int:installer_id>', methods=['POST'])
@jwt_required()
def create_user_lead(user_id, installer_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({'message': 'Unauthorized to create lead for this user'}), 403

    # Check if lead already exists
    existing_lead = UserInstaller.query.filter_by(user_id=user_id, installer_id=installer_id).first()
    if existing_lead:
        return jsonify({'message': 'Lead already exists'}), 409

    new_lead = UserInstaller(user_id=user_id, installer_id=installer_id, status='pending')
    db.session.add(new_lead)
    db.session.commit()

    return jsonify({'message': 'Lead created successfully', 'lead': user_installer_schema.dump(new_lead)}), 201

@user_bp.route('/<int:user_id>/leads/<int:installer_id>', methods=['PUT'])
@jwt_required()
def update_user_lead(user_id, installer_id):
    current_user_id = get_jwt_identity()
    # Only the user who created the lead or the installer can update the status
    lead = UserInstaller.query.filter_by(user_id=user_id, installer_id=installer_id).first_or_404()

    if current_user_id != user_id and current_user_id != lead.installer.id: # Assuming installer has a user account
        return jsonify({'message': 'Unauthorized to update this lead'}), 403

    try:
        lead_data = user_installer_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in lead_data.items():
        setattr(lead, key, value)

    db.session.commit()
    return jsonify({'message': 'Lead updated successfully', 'lead': user_installer_schema.dump(lead)}), 200

@user_bp.route('/<int:user_id>/leads/<int:installer_id>', methods=['DELETE'])
@jwt_required()
def delete_user_lead(user_id, installer_id):
    current_user_id = get_jwt_identity()
    lead = UserInstaller.query.filter_by(user_id=user_id, installer_id=installer_id).first_or_404()

    if current_user_id != user_id:
        return jsonify({'message': 'Unauthorized to delete this lead'}), 403

    db.session.delete(lead)
    db.session.commit()

    return jsonify({'message': 'Lead deleted successfully'}), 204
