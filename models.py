from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel

class Transcription(Base):
    __tablename__ = "transcriptions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)





