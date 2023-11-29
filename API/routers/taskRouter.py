# Task router class
# implements the router interface and sets relative parameters. It's possible to add more functions
# Task router implements the interface more directly, than the others as it all models implements the task Model

# imports

from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId

# local imports

from routers import interface
from models import taskModels

# routerInterface
# this is a interface for the router, which allows for using the different datamodels and databses
# these are simple CRUD operation and the interface alows for different routers to implement different methods

class taskRouter(interface.routerInterface):
    # class constructor    
    def __init__(self,dbname="test"):
        super().__init__(taskType="task", taskModel=taskModels, dbname="test")
        self.taskType = "task"
        self.taskModel = taskModels
        self.dbname="test"
        self.router = APIRouter()
        
        # routes
        # includes the 
        self.router.add_api_route("/", super().routeToCreation, methods=["POST"], response_description="Create")
        self.router.add_api_route("/{id}", super().routeToSingularity, methods=["GET"], response_description="Read one")
        self.router.add_api_route("/", super().routeToEverything, methods=["GET"],response_description="Read all")
        self.router.add_api_route("/{id}", super().routeToUpdate, methods=["PUT"],response_description="Update")
        self.router.add_api_route("/{id}", super().routeToOblivion, methods=["DELETE"],response_description="Delete")