# appointment datamodel class
# Implements the taskModel "interface" and adds a dueDate and isActive

# imports

from typing import Optional
from pydantic import Field
from datetime import datetime, timedelta

# local imports nescessary for implementing the tasks interface

from models import taskModels

# The appointment class

class model(taskModels.model):
    type: str = "appointment"
    dueDate: datetime = datetime.now() + timedelta(days=7)
    isActive: bool = Field(...)

# it's updating class

class modelUpdate(taskModels.modelUpdate):
    dueDate: Optional[datetime]
    isActive: Optional[bool]
    
# it's class for converting different tasks to a project

class modelConvert(taskModels.modelConvert):
    type: str = "appointment"

# it's conversion to dict helper function    
def modelToDict(model) -> dict:
    return {
        "id": str(model["_id"]),
        "name": model["name"],
        "description": model["description"],
        "type": model["type"],
        "dueDate": model["dueDate"],
        "isActive": model["isActive"],
        "created": model["created"],
        "updated": model["updated"]
    }