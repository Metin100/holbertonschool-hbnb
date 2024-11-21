from app.models.basemodel import BaseModel
import app

class User(BaseModel):
    def __init__(
            self, first_name,  last_name, email, password, is_admin:bool
    ):
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.places = []
        self.password = self.hash_password(password)
        self.is_admin = is_admin
    
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