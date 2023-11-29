# project datamodel class
# Implements the taskModel "interface" and adds an progress and isActive

# imports

from typing import Optional
from pydantic import Field

# local imports nescessary for implementing the tasks interface

from models import taskModels

# The project class

class model(taskModels.model):
    type: str = "project"
    progress: int = Field(...)
    isActive: bool = Field(...)

# it's updating class

class modelUpdate(taskModels.modelUpdate):
    progress: Optional[int]
    isActive: Optional[int]

# it's class for converting different tasks to a project

class modelConvert(taskModels.modelConvert):
    type: str = "project"

 # it's conversion to dict helper function    
def modelToDict(model) -> dict:
    return {
        "id": str(model["_id"]),
        "name": model["name"],
        "description": model["description"],
        "type": model["type"],
        "progress": model["progress"],
        "isActive": model["isActive"],
        "created": model["created"],
        "updated": model["updated"]
    }