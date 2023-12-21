# Chore router class
# implements the router interface and sets relative parameters. It's possible to add more functions

# imports

from fastapi import APIRouter, Body, Depends, Request, HTTPException, status
from configurations.users import current_active_user



# local imports

from models import choreModels
from routers import interface
from configurations.database import User

# The router class
# sets the correct datamodel and have database parameter with the "test"-database as the default

class choreRouter(interface.routerInterface):
    def __init__(self):
        super().__init__(taskType="chore", taskModel=choreModels)
        self.taskType = "chore"
        self.taskModel = choreModels
        self.router = APIRouter()
        
        self.router.add_api_route("/", self.routeToCreation, methods=["POST"], response_description="Create")
        self.router.add_api_route("/{id}", super().routeToOneThing, methods=["GET"], response_description="Read one")
        self.router.add_api_route("/", super().routeToSomething, methods=["GET"], response_description="Read all")
        self.router.add_api_route("/{id}", self.routeToUpdate, methods=["PUT"], response_description="Update")
        self.router.add_api_route("/{id}", super().routeToOblivion, methods=["DELETE"], response_description="Delete")
    
    async def routeToCreation(self, chore: choreModels.model, user: User = Depends(current_active_user)) -> dict:
        return await super().routeToCreation(chore, user)
    
    async def routeToUpdate(self, id: str, req: choreModels.modelUpdate, user: User = Depends(current_active_user)) -> choreModels.model:
        return await super().routeToUpdate(id, req, user)