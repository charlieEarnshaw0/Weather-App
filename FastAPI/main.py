from fastapi import FastAPI, HTTPException, Depends 
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import weatherAPI

app = FastAPI()

# Allows for React to connect to FastAPI
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

#create pydantic models for User to validate requests and responses
class UserBase(BaseModel):
    email: str
    username: str
    first_name: str
    last_name: str
    hashed_password: str
    is_active: bool

class UserModel(UserBase):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

#Database Endpoints 

#Create User
@app.post("/users/", response_model=UserModel)
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#get all users 
@app.get("/users/", response_model=list[UserModel])
async def read_users(db: db_dependency):
    users = db.query(models.User).all()
    return users

# Querying weather API
@app.get("/weather/{city}")
async def get_weather(city: str):
    return weatherAPI.getCurrentWeather(city)

@app.get("/weather/")  # default to Paris
async def get_weather_empty():
    return weatherAPI.getCurrentWeather("Paris")

