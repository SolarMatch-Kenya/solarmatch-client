from flask import Blueprint, request, jsonify
from app import db
from app.models import Message
from app.schemas import MessageSchema
from flask_jwt_extended import jwt_required, get_jwt_identity
import openai
import os

chatbot_bp = Blueprint('chatbot_bp', __name__)
message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

@chatbot_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat_with_sunny():
    current_user_id = get_jwt_identity()
    user_message_content = request.json.get('message')

    if not user_message_content:
        return jsonify({'message': 'Message content is required'}), 400

    # Save user message to database
    user_message = Message(user_id=current_user_id, content=user_message_content, is_from_user=True)
    db.session.add(user_message)
    db.session.commit()

    # Get conversation history for context
    conversation_history = Message.query.filter_by(user_id=current_user_id).order_by(Message.created_at.asc()).limit(10).all()
    
    messages_for_openai = [{'role': 'system', 'content': 'You are Sunny, an AI solar advisor for SolarMatch Kenya. Provide helpful and concise advice about solar energy, suitability, costs, and financing in Kenya. Keep responses under 150 words.'}]
    for msg in conversation_history:
        role = 'user' if msg.is_from_user else 'assistant'
        messages_for_openai.append({'role': role, 'content': msg.content})

    messages_for_openai.append({'role': 'user', 'content': user_message_content})

    try:
        openai.api_key = os.environ.get('OPENAI_API_KEY')
        if not openai.api_key:
            return jsonify({'message': 'OpenAI API key not configured.'}), 500

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo", # or "gpt-4"
            messages=messages_for_openai,
            max_tokens=150
        )
        sunny_response_content = response.choices[0].message.content

        # Save Sunny's response to database
        sunny_message = Message(user_id=current_user_id, content=sunny_response_content, is_from_user=False)
        db.session.add(sunny_message)
        db.session.commit()

        return jsonify({'message': sunny_response_content}), 200

    except Exception as e:
        print(f"Error communicating with OpenAI: {e}")
        return jsonify({'message': 'Error communicating with AI advisor.'}), 500

@chatbot_bp.route('/history', methods=['GET'])
@jwt_required()
def get_chat_history():
    current_user_id = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)

    history = Message.query.filter_by(user_id=current_user_id).order_by(Message.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'history': messages_schema.dump(history.items),
        'total_pages': history.pages,
        'current_page': history.page,
        'total_items': history.total
    }), 200
