from app.persistence.repository import SQLAlchemyRepository
from app.extensions import db
from app.models.users import User


class UserRepository(SQLAlchemyRepository):
    def __init__(self):
        super().__init__()

    def get_user_by_email(self, email):
        return self.model.query.filter_by(email=email).first()