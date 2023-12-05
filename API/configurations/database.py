# Imports
from beanie import Document
from fastapi_users.db import BaseOAuthAccount, BeanieBaseUser, BeanieUserDatabase
import motor.motor_asyncio
from pydantic import Field
from typing import List

databaseURL = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(
    databaseURL, uuidRepresentation="standard"
)
db = client["obliGentle"]

class OAuthAccount(BaseOAuthAccount):
    pass 

class User(BeanieBaseUser, Document):
    oauth_accounts: List[OAuthAccount] = Field(default_factory=list)

async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)

#databaseName = "obliGentle"

#app.mongodb_client = AsyncIOMotorClient(dbc.databaseURL)
#app.mongodb = app.mongodb_client[dbc.databaseName]