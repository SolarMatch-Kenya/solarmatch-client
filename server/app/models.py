from datetime import datetime
from app import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default='user') # 'user', 'installer', 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    analyses = db.relationship('Analysis', backref='user', lazy=True)
    leads = db.relationship('UserInstaller', back_populates='user', lazy=True)
    messages = db.relationship('Message', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Installer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(200))
    services_offered = db.Column(db.Text)
    location = db.Column(db.String(100))
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer_leads = db.relationship('UserInstaller', back_populates='installer', lazy=True)

    def __repr__(self):
        return f'<Installer {self.name}>'

class UserInstaller(db.Model):
    __tablename__ = 'user_installer'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    installer_id = db.Column(db.Integer, db.ForeignKey('installer.id'), primary_key=True)
    status = db.Column(db.String(50), default='pending') # e.g., 'pending', 'accepted', 'rejected'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='leads')
    installer = db.relationship('Installer', back_populates='customer_leads')

    def __repr__(self):
        return f'<User {self.user_id} - Installer {self.installer_id}>'

class Analysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    roof_type = db.Column(db.String(100))
    monthly_bill = db.Column(db.Float)
    roof_suitability = db.Column(db.Float) # Percentage
    estimated_cost = db.Column(db.Float)
    roi = db.Column(db.Float)
    co2_savings = db.Column(db.Float)
    report_url = db.Column(db.String(500)) # URL to generated report
    image_url = db.Column(db.String(500)) # URL to uploaded roof image
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Analysis {self.id} for User {self.user_id}>'

class Financer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_info = db.Column(db.String(200))
    loan_products = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Financer {self.name}>'

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_from_user = db.Column(db.Boolean, nullable=False) # True if from user, False if from chatbot
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Message {self.id} from User {self.user_id} (is_user: {self.is_from_user})>'
