from flask import Blueprint, request, jsonify
from app import db
from app.models import Analysis
from app.schemas import AnalysisSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

analysis_bp = Blueprint('analysis_bp', __name__)
analysis_schema = AnalysisSchema()
analyses_schema = AnalysisSchema(many=True)

@analysis_bp.route('/', methods=['POST'])
@jwt_required()
def create_analysis():
    current_user_id = get_jwt_identity()
    try:
        analysis_data = analysis_schema.load(request.json)
    except ValidationError as err:
        return jsonify(err.messages), 400

    if analysis_data['user_id'] != current_user_id:
        return jsonify({'message': 'Unauthorized to create analysis for this user'}), 403

    new_analysis = Analysis(**analysis_data)
    db.session.add(new_analysis)
    db.session.commit()

    return jsonify({'message': 'Analysis created successfully', 'analysis': analysis_schema.dump(new_analysis)}), 201

@analysis_bp.route('/', methods=['GET'])
@jwt_required()
def get_analyses():
    current_user_id = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    analyses = Analysis.query.filter_by(user_id=current_user_id).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'analyses': analyses_schema.dump(analyses.items),
        'total_pages': analyses.pages,
        'current_page': analyses.page,
        'total_items': analyses.total
    }), 200

@analysis_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_analysis(id):
    current_user_id = get_jwt_identity()
    analysis = Analysis.query.get_or_404(id)

    if analysis.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized to view this analysis'}), 403

    return jsonify(analysis_schema.dump(analysis)), 200

@analysis_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_analysis(id):
    current_user_id = get_jwt_identity()
    analysis = Analysis.query.get_or_404(id)

    if analysis.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized to update this analysis'}), 403

    try:
        analysis_data = analysis_schema.load(request.json, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400

    for key, value in analysis_data.items():
        setattr(analysis, key, value)

    db.session.commit()
    return jsonify({'message': 'Analysis updated successfully', 'analysis': analysis_schema.dump(analysis)}), 200

@analysis_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_analysis(id):
    current_user_id = get_jwt_identity()
    analysis = Analysis.query.get_or_404(id)

    if analysis.user_id != current_user_id:
        return jsonify({'message': 'Unauthorized to delete this analysis'}), 403

    db.session.delete(analysis)
    db.session.commit()

    return jsonify({'message': 'Analysis deleted successfully'}), 204
