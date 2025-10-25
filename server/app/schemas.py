from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import User, Installer, Analysis, Financer, Message, UserInstaller

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_relationships = True

    username = fields.String(validate=validate.Length(min=3, error='Username must be at least 3 characters long'))
    email = fields.Email(required=True)
    full_name = fields.String(required=True)
    phone_number = fields.String()
    role = fields.String(validate=validate.OneOf(['user', 'installer', 'admin']))

class InstallerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Installer
        load_instance = True
        include_relationships = True

    name = fields.String(required=True, 
                         validate=validate.Length(min=3, error='Name must be at least 3 characters long'))
    contact_info = fields.String(required=True)
    services_offered = fields.String()
    location = fields.String(required=True)
    is_verified = fields.Boolean()

class AnalysisSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Analysis
        load_instance = True
        include_relationships = True

    user_id = fields.Integer(required=True)
    location = fields.String(required=True)
    roof_type = fields.String()
    monthly_bill = fields.Float()
    roof_suitability = fields.Float()
    estimated_cost = fields.Float()
    roi = fields.Float()
    co2_savings = fields.Float()
    report_url = fields.URL()
    image_url = fields.URL()

class FinancerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Financer
        load_instance = True
        include_relationships = True

    name = fields.String(required=True)
    contact_info = fields.String(required=True)
    loan_products = fields.String()

class MessageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        include_relationships = True

    user_id = fields.Integer(required=True)
    content = fields.String(required=True)
    is_from_user = fields.Boolean(required=True)

class UserInstallerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UserInstaller
        load_instance = True
        include_relationships = True

    user_id = fields.Integer(required=True)
    installer_id = fields.Integer(required=True)
    status = fields.String(validate=validate.OneOf(['pending', 'accepted', 'rejected']))
