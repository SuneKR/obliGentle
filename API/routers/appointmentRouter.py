# Appointment router class
# implements the router interface and sets relative parameters. It's possible to add more functions

# imports

from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId

# local imports

from models import appointmentModels
from routers import interface

# The router class
# sets the correct datamodel and have database parameter with the "test"-database as the default

class appointmentRouter(interface.routerInterface):
    def __init__(self,dbname="test"):
        super().__init__(taskType="appointment", taskModel=appointmentModels, dbname="test")
        self.taskType = "appointment"
        self.taskModel = appointmentModels
        self.dbname="test"
        self.router = APIRouter()
        
        self.router.add_api_route("/", self.routeToCreation, methods=["POST"], response_description="Create")
        self.router.add_api_route("/{id}", super().routeToSingularity, methods=["GET"], response_description="Read one")
        self.router.add_api_route("/", super().routeToGroup, methods=["GET"],response_description="Read all")
        self.router.add_api_route("/{id}", self.routeToUpdate, methods=["PUT"],response_description="Update")
        self.router.add_api_route("/{id}", super().routeToOblivion, methods=["DELETE"],response_description="Delete")
    
    async def routeToCreation(self, request: Request, task: appointmentModels.model = Body(...)):
        task = jsonable_encoder(task)
        creationInsert = await request.app.mongodb[self.dbname].insert_one(task)
        creationCheck = await request.app.mongodb[self.dbname].find_one({"_id": creationInsert.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=appointmentModels.modelToDict(creationCheck))
    
    async def routeToUpdate(self, id: str, request: Request, task: appointmentModels.modelUpdate = Body(...)):
        task ={dictKey: dictVal for dictKey, dictVal in task.dict().items() if dictVal is not None}
        if len(task) >= 1:
            updater = await request.app.mongodb[self.dbname].update_one({"_id": ObjectId(id)}, {"$set": task})
            if updater == True:
                if updated := await request.app.mongodb[self.dbname].find_one({"_id": ObjectId(id)}) is not None: return updated
        if updateFinished := await request.app.mongodb[self.dbname].find_one({"_id": ObjectId(id)}) is not None: return updateFinished
        raise HTTPException(status_code=404, detail=f"Task {id} not found")