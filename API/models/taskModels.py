# Interface for all task datamodels
# The interface is called task and are implemtented to all the specic kinds of task
# Task simply have name, description and timestamps
# Tasks can be populated just by using Field names and uses MongoDB's standard id.

# imports

from beanie import Document
from fastapi import Depends
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson.objectid import ObjectId

from configurations.database import get_user_db, User
from configurations.users import fastapi_users,  current_active_user

#currentUser = fastapi_users.current_user(active=True)
current_active_user = fastapi_users.current_user(active=True)

# The datamodels class including the config.

class model(Document):    
    _id: Optional[ObjectId] = Field(alias="id")
    name: str = Field(...)
    description: str = Field(...)    
    owner: Optional[str] = "undefined"
    type: str = "task"
    created: datetime = Field(default_factory=datetime.now)
    updated: datetime = Field(default_factory=datetime.now)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        
    class Settings:
        #async def idMe(user: User = Depends(current_active_user)): return { str(user.email) }
        #user: User = Depends(fastapi_users.current_user(active=True))
        #name = requests.get(f"http://127.0.0.1:8000/idme")
        #name = idMe()
        name = "task"
        #name = collection
        #name = requests.get(f"hhttp://127.0.0.1:8000/idMe")
        

# the model for updating the class
# which allow for only updating some values

class modelUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    owner: Optional[str]
    updated: datetime = Field(default_factory=datetime.now)
    
    class Config:
        arbitrary_types_allowed = True

# the class for converting a task to a task (which makes alot more sense in it's implementation than in the interface - where is seems tautological at best)

class modelConvert(BaseModel):
    type: str = "task"
    updated: datetime = Field(default_factory=datetime.now)
    
    class Config:
        arbitrary_types_allowed = True

# A converter "helper" function, that converts the model to dict to ease the displaying and manipulating the model

def modelToDict(model) -> dict:
    return {
        "id": str(model["_id"]),
        "name": model["name"],
        "description": model["description"],
        "owner": model["owner"],
        "type": model["type"],
        "created": model["created"],
        "updated": model["updated"]
    }