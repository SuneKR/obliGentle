# Interface for all routers
# contains a create, two read (one and all), a update and a delete route

# imports

from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from pymongo import ReturnDocument

# local imports

from models import taskModels

# Initialization of router
router = APIRouter()
taskType = taskModels
dbname = "tasks"

# Create route
@router.post("/", response_description="Create")
async def routeToCreation(request: Request, task: taskType.model = Body(...)):
    task = jsonable_encoder(task)
    creationInsert = await request.app.mongodb[dbname].insert_one(task)
    creationCheck = await request.app.mongodb[dbname].find_one({"_id": creationInsert.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=taskType.modelToDict(creationCheck))

# Read routes
# Includes two methods: a "find one" and a "find all" read routes

## read one
@router.get("/{id}", response_description="Read one")
async def routeToSingularity(id: str, request: Request):
    if (task := await request.app.mongodb[dbname].find_one({"_id": ObjectId(id)})) is not None: return taskType.modelToDict(task)
    raise HTTPException(status_code=404, detail=f"Task {id} not found")

## read all
@router.get("/", response_description="Read all")
async def routeToEverything(request: Request):
    scrollOfEverything = []
    for task in await request.app.mongodb[dbname].find().to_list(length=255):
        scrollOfEverything.append(taskType.modelToDict(task))
    return scrollOfEverything

# update route
# updates via a dictionary, which check for empty fields, which in turn allows us to only update the new values
# after updating
@router.put("/{id}", response_description="Update")
async def routeToUpdate(id: str, request: Request, task: taskType.modelUpdate = Body(...)):
    task ={dictKey: dictVal for dictKey, dictVal in task.dict().items() if dictVal is not None}
    if len(task) >= 1:
        updater = await request.app.mongodb[dbname].update_one({"_id": ObjectId(id)}, {"$set": task})
        if updater == True:
            if updated := await request.app.mongodb[dbname].find_one({"_id": ObjectId(id)}) is not None: return updated
        if updateFinished := await request.app.mongodb[dbname].find_one({"_id": ObjectId(id)}) is not None: return updateFinished
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

# delete route
@router.delete("{id}", response_description="Delete")
async def routeToOblivion(id: str, request: Request):
    deleter = await request.app.mongodb[dbname].delete_one({"_id": ObjectId(id)})
    if deleter.deleted_count == True: return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"Task {id} not found")