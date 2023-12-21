# Imports
from typing import List

import motor.motor_asyncio
from beanie import Document
#from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase
from fastapi_users_db_beanie import BeanieBaseUser, BeanieUserDatabase

from pydantic import Field


databaseURL = "mongodb://localhost:27017"
databaseName = "obliGentle"

client = motor.motor_asyncio.AsyncIOMotorClient(
    databaseURL, uuidRepresentation="standard"
)
dbc = client[databaseName]

class User(BeanieBaseUser, Document):
    class Config:
        arbitrary_types_allowed = True 
    pass

async def get_user_db():
    yield BeanieUserDatabase(User)