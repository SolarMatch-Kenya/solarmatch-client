from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()
cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.analysis_routes import analysis_bp
    from app.routes.installer_routes import installer_bp
    from app.routes.user_routes import user_bp
    from app.routes.chatbot_routes import chatbot_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(analysis_bp, url_prefix='/api/analysis')
    app.register_blueprint(installer_bp, url_prefix='/api/installers')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(chatbot_bp, url_prefix='/api/chatbot')

    return app
