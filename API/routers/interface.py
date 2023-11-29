# Interface for all routers
# contains a create, three read (one, group and all), a update and a delete route

# imports

from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId

# local imports

from models import taskModels

# routerInterface
# this is a interface for the router, which allows for using the different datamodels and databses
# these are simple CRUD operation and the interface alows for different routers to implement different methods

class routerInterface:
    # class constructor
    def __init__ (self, taskType = "task", taskModel=taskModels, dbname="test"):
        self.taskType = taskType
        self.taskModel = taskModel
        self.dbname = dbname
            
    # Initialization of router
    #router = APIRouter()
    
    # Create route
    #@router.post("/", response_description="Create")
    async def routeToCreation(self, request: Request, task: taskModels.model = Body(...)):
        task = jsonable_encoder(task)
        creationInsert = await request.app.mongodb[self.dbname].insert_one(task)
        creationCheck = await request.app.mongodb[self.dbname].find_one({"_id": creationInsert.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=taskModels.modelToDict(creationCheck))

    # Read routes
    # Includes three methods: a "find one", a "find all", and a "find of all type" read routes

    ## read one
    #@router.get("/{id}", response_description="Read one")
    async def routeToSingularity(self, id: str, request: Request):
        if (task := await request.app.mongodb[self.dbname].find_one({"_id": ObjectId(id)})) is not None: return self.taskModel.modelToDict(task)
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    ## read all
    #@router.get("/", response_description="Read all")
    async def routeToEverything(self, request: Request):
        scrollOfEverything = []
        for task in await request.app.mongodb[self.dbname].find().to_list(length=255):
            scrollOfEverything.append(self.taskModel.modelToDict(task))
        return scrollOfEverything
    
    ## read all of type
    #@router.get("/{type}", response_description="Read all")
    async def routeToGroup(self, request: Request):
        scrollOfGrouping = []
        for task in await request.app.mongodb[self.dbname].find().to_list(length=255):
            if (taskModels.modelToDict(task)["type"] == self.taskType): scrollOfGrouping.append(self.taskModel.modelToDict(task))
        return scrollOfGrouping

    # update route
    # updates via a dictionary, which check for empty fields, which in turn allows us to only update the new values
    # after updating
    #@router.put("/{id}", response_description="Update")
    async def routeToUpdate(self, id: str, request: Request, task: taskModels.modelUpdate = Body(...)):
        task ={dictKey: dictVal for dictKey, dictVal in task.dict().items() if dictVal is not None}
        if len(task) >= 1:
            updater = await request.app.mongodb[self.dbname].update_one({"_id": ObjectId(id)}, {"$set": task})
            if updater == True:
                if updated := await request.app.mongodb[self.dbname].find_one({"_id": ObjectId(id)}) is not None: return updated
        if updateFinished := await request.app.mongodb[self.dbname].find_one({"_id": ObjectId(id)}) is not None: return updateFinished
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # delete route
    #@router.delete("{id}", response_description="Delete")
    async def routeToOblivion(self, id: str, request: Request):
        deleter = await request.app.mongodb[self.dbname].delete_one({"_id": ObjectId(id)})
        if deleter.deleted_count == 1: return Response(status_code=status.HTTP_204_NO_CONTENT)
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

