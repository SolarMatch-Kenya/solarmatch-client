from flask import Blueprint, request, jsonify
from app import db
from app.models import Installer
from app.schemas import InstallerSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

installer_bp = Blueprint('installer_bp', __name__)
installer_schema = InstallerSchema()
installers_schema = InstallerSchema(many=True)

@installer_bp.route('/', methods=['POST'])
@jwt_required()
def create_installer():
    # In a real app, you'd add role-based access control here
    # e.g., only admins can create installers
    try:
        installer_data = installer_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    new_installer = Installer(**installer_data)
    db.session.add(new_installer)
    db.session.commit()

    return jsonify({'message': 'Installer created successfully', 'installer': installer_schema.dump(new_installer)}), 201

@installer_bp.route('/', methods=['GET'])
def get_installers():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    installers = Installer.query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'installers': installers_schema.dump(installers.items),
        'total_pages': installers.pages,
        'current_page': installers.page,
        'total_items': installers.total
    }), 200

@installer_bp.route('/<int:id>', methods=['GET'])
def get_installer(id):
    installer = Installer.query.get_or_404(id)
    return jsonify(installer_schema.dump(installer)), 200

@installer_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_installer(id):
    # In a real app, you'd add role-based access control here
    installer = Installer.query.get_or_404(id)

    try:
        installer_data = installer_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in installer_data.items():
        setattr(installer, key, value)

    db.session.commit()
    return jsonify({'message': 'Installer updated successfully', 'installer': installer_schema.dump(installer)}), 200

@installer_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_installer(id):
    # In a real app, you'd add role-based access control here
    installer = Installer.query.get_or_404(id)
    db.session.delete(installer)
    db.session.commit()

    return jsonify({'message': 'Installer deleted successfully'}), 204

@installer_bp.route('/<int:id>/overview', methods=['GET'])
@jwt_required()
def get_installer_overview(id):
    # In a real app, you would fetch this data from the database
    # For now, we will return mock data
    mock_overview_data = {
        'newLeads': 12,
        'pendingInstallations': 5,
        'totalEarnings': 4500,
    }
    return jsonify(mock_overview_data), 200
