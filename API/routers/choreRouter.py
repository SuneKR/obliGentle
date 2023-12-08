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
        self.router.add_api_route("/", super().routeToSomething, methods=["GET"],response_description="Read all")
        self.router.add_api_route("/{id}", self.routeToUpdate, methods=["PUT"],response_description="Update")
        self.router.add_api_route("/{id}", super().routeToOblivion, methods=["DELETE"],response_description="Delete")
    
    async def routeToCreation(self, chore: choreModels.model, user: User = Depends(current_active_user)) -> dict:
        return await super().routeToCreation(chore, user)
    
    async def routeToUpdate(self, id: str, req: choreModels.modelUpdate, user: User = Depends(current_active_user)) -> choreModels.model:
        return await super().routeToUpdate(id, req, user)
    
    ''''
    async def routeToCreation(self, request: Request, task: choreModels.model = Body(...)):
        task = jsonable_encoder(task)
        creationInsert = await request.app.mongodb[user.id].insert_one(task)
        creationCheck = await request.app.mongodb[user.id].find_one({"_id": creationInsert.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=choreModels.modelToDict(creationCheck))
    
    async def routeToUpdate(self, id: str, request: Request, task: choreModels.modelUpdate = Body(...)):
        task ={dictKey: dictVal for dictKey, dictVal in task.dict().items() if dictVal is not None}
        if len(task) >= 1:
            updater = await request.app.mongodb[user.id].update_one({"_id": ObjectId(id)}, {"$set": task})
            if updater == True:
                if updated := await request.app.mongodb[user.id].find_one({"_id": ObjectId(id)}) is not None: return updated
        if updateFinished := await request.app.mongodb[user.id].find_one({"_id": ObjectId(id)}) is not None: return updateFinished
        raise HTTPException(status_code=404, detail=f"Task {id} not found")
    '''