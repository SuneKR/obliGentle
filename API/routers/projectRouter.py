# Project router class
# implements the router interface and sets relative parameters. It's possible to add more functions

# imports

from fastapi import APIRouter, Body, Depends, Request, HTTPException, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from configurations.database import User
from configurations.users import current_active_user

# local imports

from models import projectModels
from routers import interface

# The router class
# sets the correct datamodel and have database parameter with the "test"-database as the default

class projectRouter(interface.routerInterface):
    def __init__(self):
        super().__init__(taskType="project", taskModel=projectModels)
        self.taskType = "project"
        self.taskModel = projectModels
        self.router = APIRouter()
        
        self.router.add_api_route("/", self.routeToCreation, methods=["POST"], response_description="Create")
        self.router.add_api_route("/{id}", super().routeToOneThing, methods=["GET"], response_description="Read one")
        self.router.add_api_route("/", super().routeToSomething, methods=["GET"],response_description="Read all")
        self.router.add_api_route("/{id}", self.routeToUpdate, methods=["PUT"],response_description="Update")
        self.router.add_api_route("/{id}", super().routeToOblivion, methods=["DELETE"],response_description="Delete")
    
    
    async def routeToCreation(self, task: projectModels.model, user: User = Depends(current_active_user)) -> dict:
        return await super().routeToCreation(task, user)
    
    async def routeToUpdate(self, id: str, req: projectModels.modelUpdate, user: User = Depends(current_active_user)) -> projectModels.model:
        return await super().routeToUpdate(id, req, user)