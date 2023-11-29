# chore datamodel class
# Implements the taskModel "interface" and adds an interval and priority

# imports

from typing import Optional
from pydantic import Field

# local imports nescessary for implementing the tasks interface

from models import taskModels

# The chore class

class model(taskModels.model):
    type: str = "chore"
    priority: int = Field(...)
    interval: int = Field(...)
    
    

# it's updating class

class modelUpdate(taskModels.modelUpdate):
    priority: Optional[int]
    interval: Optional[int]

# it's class for converting different tasks to a project

class modelConvert(taskModels.modelConvert):
    type: str = "chore"

# it's conversion to dict helper function  
def modelToDict(model) -> dict:
    return {
        "id": str(model["_id"]),
        "name": model["name"],
        "description": model["description"],
        "type": model["type"],
        "priority": model["priority"],
        "interval": model["interval"],
        "created": model["created"],
        "updated": model["updated"]
    }