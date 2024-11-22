from app.models.basemodel import BaseModel
from app.models.places import Place
from app.models.users import User
from app.extensions import db

class Review(BaseModel):
    __tablename__ = "reviews"

    text = db.Column(db.String(155), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)


    def __init__(self, text, rating, place: Place, user: User):
        super().__init__()
        self.text = text
        self.rating = rating
        # self.place = place
        # self.user = user

    def to_dict(self):
        """Convert the User instance into a dictionary."""
        base_dict = super().to_dict()
        base_dict.update({
            "text": self.text,
            "rating": self.rating,
            # "place": self.place.to_dict(),
            # "user": self.user.to_dict()
        })
        return base_dict