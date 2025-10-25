import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///solarmatch.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'super-secret-jwt-key'
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    CLOUDINARY_URL = os.environ.get('CLOUDINARY_URL')
    MAPBOX_TOKEN = os.environ.get('MAPBOX_TOKEN')

    # Google OAuth configuration
    GOOGLE_OAUTH_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')
    GOOGLE_OAUTH_CLIENT_SECRET = os.environ.get('GOOGLE_OAUTH_CLIENT_SECRET')