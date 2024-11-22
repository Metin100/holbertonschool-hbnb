from app.models.basemodel import BaseModel
from app.extensions import db


class Amenity(BaseModel):
    __tablename__ = "amenities"

    name = db.Column(db.String(155), nullable=False)
    
    def __init__(self, name):
        super().__init__()
        self.name = name

    def to_dict(self):
        base_dict = super().to_dict()
        base_dict.update({
            "name": self.name
        })
        return base_dict