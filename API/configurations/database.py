# Imports
from typing import List

import motor.motor_asyncio
from beanie import Document
from fastapi_users_db_beanie import BeanieBaseUser, BeanieUserDatabase

from pydantic import Field

# this is for a school project. Otherwise I wouldn't include the passcode
#databaseURL = "mongodb://localhost:27017"
#databaseURL = "mongodb+srv://obligentle:8iqFgThXkPxzd4PEEQmW2iydsfqKCWtCGik7ssZGFxPTgGg6hAzEGdD7Lb4g6RiK@obliGentle.litujjv.mongodb.net"
databaseURL = "mongodb+srv://obligentle:8iqFgThXkPxzd4PEEQmW2iydsfqKCWtCGik7ssZGFxPTgGg6hAzEGdD7Lb4g6RiK@obligentle.litujjv.mongodb.net/?retryWrites=true&w=majority"
databaseName = "ObliGentle"

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