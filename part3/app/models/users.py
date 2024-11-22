from app.models.basemodel import BaseModel
import app
from app.extensions import db

class User(BaseModel):
    __tablebname__ = 'users'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

   
    def add_place(self, place):
        self.places.append(place)

    def hash_password(self, password):
        return app.bcrypt.generate_password_hash(password).decode('utf-8')
    
    def verify_password(self, password):
        return app.bcrypt.check_password_hash(self.password, password)
    

    def to_dict(self):
        """Convert the User instance into a dictionary."""
        base_dict = super().to_dict()
        base_dict.update({
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "is_admin": self.is_admin
        })
        return base_dict