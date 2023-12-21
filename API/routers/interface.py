# Interface for all routers
# contains a create, three read (one, group and all), a update and a delete route

# imports

from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId

# local imports

from models import taskModels

from configurations.database import dbc, User, get_user_db
from configurations.schemas import UserCreate, UserRead, UserUpdate
from configurations.users import auth_backend, current_active_user, fastapi_users

# routerInterface
# this is a interface for the router, which allows for using the different datamodels and databses
# these are simple CRUD operation and the interface alows for different routers to implement different methods

class routerInterface:
    # class constructor
    def __init__ (self, taskType = "task", taskModel=taskModels):
        self.taskType = taskType
        self.taskModel = taskModel
        self.router = APIRouter()
            
    # Initialization of router
    #router = APIRouter()
    
    # Create route
    #@router.post("/", response_description="Create")
    async def routeToCreation(self, task: taskModels.model, user: User = Depends(current_active_user)) -> dict:
        taskWithOwner = task
        taskWithOwner.owner = str(user.id)
        await taskWithOwner.create()
        return {"message": "Task added"}
    
    '''
    async def routeToCreation(self, request: Request, task: taskModels.model = Body(...), user: User = Depends(current_active_user)):
        task = jsonable_encoder(task)
        creationInsert = await request.app.dbc[user.id].insert_one(task)
        creationCheck = await request.app.dbc[user.id].find_one({"_id": creationInsert.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=taskModels.modelToDict(creationCheck))
    '''
    # Read routes
    # Includes three methods: a "find one", a "find all", and a "find of all type" read routes

    ## read one
    #@router.get("/{id}", response_description="Read one")
    async def routeToOneThing(self, id: str, user: User = Depends(current_active_user)) -> taskModels.model:
        task = await self.taskModel.model.get(id)
        return task
    
    ''''
    async def routeToSingularity(self, id: str, request: Request, user: User = Depends(current_active_user)):
        if (task := await request.app.mongodb[user.id].find_one({"_id": ObjectId(id)})) is not None: return self.taskModel.modelToDict(task)
        raise HTTPException(status_code=404, detail=f"Task {id} not found")
    '''
    ## read all
    #@router.get("/", response_description="Read all")
    async def routeToEverything(self, user: User = Depends(current_active_user)) -> list[taskModels.model]:
        tasks = []
        for task in await self.taskModel.model.find_all().to_list():
            if(task.owner == str(user.id)): tasks.append(task)
        return tasks
    ''''
    async def routeToEverything(self, request: Request, user: User = Depends(current_active_user)):
        scrollOfEverything = []
        for task in await request.app.mongodb[user.id].find().to_list(length=255):
            scrollOfEverything.append(self.taskModel.modelToDict(task))
        return scrollOfEverything
    '''
    ## read all of type
    #@router.get("/{type}", response_description="Read all")
    async def routeToSomething(self, user: User = Depends(current_active_user)) -> list[taskModels.model]:
        tasks = []
        for task in await self.taskModel.model.find_all().to_list():
            if(task.owner == str(user.id)): 
                if(task.type == str(self.taskType)):
                    tasks.append(task)
        return tasks
    
    ''''
    async def routeToSomething(self, request: Request, user: User = Depends(current_active_user)):
        scrollOfGrouping = []
        for task in await request.app.mongodb[user.id].find().to_list(length=255):
            if (taskModels.modelToDict(task)["type"] == self.taskType): scrollOfGrouping.append(self.taskModel.modelToDict(task))
        return scrollOfGrouping
    '''
    # update route
    # updates via a dictionary, which check for empty fields, which in turn allows us to only update the new values
    # after updating
    #@router.put("/{id}", response_description="Update")
    async def routeToUpdate(self, id: str, req: taskModels.modelUpdate, user: User = Depends(current_active_user)) -> taskModels.model:
        req: self.taskModel.modelUpdate
        req = { key: val for key, val in req.dict().items() if val is not None }
        updateQuery = { "$set": { field: value for field, value in req.items() } }
        
        task = await self.taskModel.model.get(id)
        if not task: raise HTTPException(status_code=404, detail="Task not found")
        await task.update(updateQuery)
        return task
    
    ''''
    async def routeToUpdate(self, id: str, request: Request, task: taskModels.modelUpdate = Body(...), user: User = Depends(current_active_user)):
        task ={dictKey: dictVal for dictKey, dictVal in task.dict().items() if dictVal is not None}
        if len(task) >= 1:
            updater = await request.app.mongodb[user.id].update_one({"_id": ObjectId(id)}, {"$set": task})
            if updater == True:
                if updated := await request.app.mongodb[user.id].find_one({"_id": ObjectId(id)}) is not None: return updated
        if updateFinished := await request.app.mongodb[user.id].find_one({"_id": ObjectId(id)}) is not None: return updateFinished
        raise HTTPException(status_code=404, detail=f"Task {id} not found")
    '''
    # delete route
    #@router.delete("{id}", response_description="Delete")
    async def routeToOblivion(self, id: str, user: User = Depends(current_active_user)) -> dict:
        oblivious = await self.taskModel.model.get(id)
        if not oblivious: raise HTTPException(status_code=404, detail="Task not found") 
        await oblivious.delete()
        return oblivious
    
    '''
    async def routeToOblivion(self, id: str, request: Request, user: User = Depends(current_active_user)):
        deleter = await request.app.mongodb[user.id].delete_one({"_id": ObjectId(id)})
        if deleter.deleted_count == 1: return Response(status_code=status.HTTP_204_NO_CONTENT)
        raise HTTPException(status_code=404, detail=f"Task {id} not found")
    '''
