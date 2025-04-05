# from sqlalchemy import create_engine, Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
#
#
#
# DATABASE_URL='postgresql+psycopg2://postgres:789632147Aa@localhost:5432/aliameri'
#
#
#
# # Create Engine
#
# engine = create_engine(DATABASE_URL, echo=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
#
# Base = declarative_base()
#
# # Create tables
# Base.metadata.create_all(bind=engine)
# # Dependency for Database Session
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
