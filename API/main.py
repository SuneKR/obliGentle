# Main file for running the API
# initialize the API and runs the database connect asyncronized

#imports

from beanie import init_beanie
#import beanie.init_beanie
#import beanie
from fastapi import Depends, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
#import uvicorn
#from beanie import init_beanie

#local imports

from configurations.database import dbc, User
from configurations.schemas import UserCreate, UserRead, UserUpdate
from configurations.users import auth_backend, current_active_user, fastapi_users
from routers import appointmentRouter as aRouter, choreRouter as cRouter, projectRouter as pRouter, taskRouter as tRouter
from models import appointmentModels, choreModels, projectModels, taskModels


# Initiation of FastAPI and configuration

app = FastAPI()

## Origins and middleware files which allows
## cross origin and different origins connections.

origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:443",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8443",
    "http://localhost:19006"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

'''
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
'''
# Routes and routers
# The following are just plain routes and are mainly used for test
# or checking online status

@app.get("/")
async def root(): return {"message": "Working"}

@app.get("/authticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}

@app.get("/status")
async def getStatus(): return {"status": "Running"}

# The following are routes to the routers

## These are the user and authentication related routes

app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"])
#app.include_router(fastapi_users.get_oauth_router(google_oauth_client, auth_backend, "SECRET"), prefix="/auth/google", tags=["auth"])

## These are the different task routes

app.include_router(aRouter.appointmentRouter().router, prefix="/appointments", tags=["appointments"])
app.include_router(cRouter.choreRouter().router, prefix="/chores" ,tags=["chores"])
app.include_router(pRouter.projectRouter().router,prefix="/projects", tags=["projects"])
app.include_router(tRouter.taskRouter().router, prefix="/tasks", tags=["tasks"])

# The async database connection
# It links to it's own separate configuration file (later)

@app.on_event("startup")
#async def on_startup():
async def on_startup():
    await init_beanie(
        database=dbc,
        document_models=[
            User,
            taskModels.model
        ],
    )

'''

@app.on_event("startup")
#async def on_startup():
async def on_startup():
    await init_beanie(
        database=dbc,
        document_models=[
            appointmentModels.model,
            choreModels.model,
            projectModels.model,
            taskModels.model,
            User,
        ],
    )

# For running the application with uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", log_level="info")
'''

