# Interface for all task datamodels
# The interface is called task and are implemtented to all the specic kinds of task
# Task simply have name, description and timestamps
# Tasks can be populated just by using Field names and uses MongoDB's standard id.

# imports

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
import inspect

# The datamodels class including the config.

class model(BaseModel):
    name: str = Field(...)
    description: str = Field(...)
    type: str = "task"
    created: datetime = Field(default_factory=datetime.now)
    updated: datetime = Field(default_factory=datetime.now)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True

# the model for updating the class
# which allow for only updating some values

class modelUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
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
        "type": model["type"],
        "created": model["created"],
        "updated": model["updated"]
    }