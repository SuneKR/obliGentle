# Main file for running the API
# initialize the API and runs the database connect asyncronized

#imports

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

#local imports

from configurations import databaseConfigurations as dbc
from routers import appointmentRouter as aRouter, choreRouter as cRouter, projectRouter as pRouter, taskRouter as tRouter, routerNoClass as ncRouter

# Initiation of FastAPI and configuration

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:19006"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# The async database connection
# It links to it's own separate configuration file (later)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(dbc.databaseURL)
    app.mongodb = app.mongodb_client[dbc.databaseName]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Routes and routers
# The following are just plain routes and are mainly used for test
# or checking online status

@app.get("/")
async def root(): return {"message": "Working"}

@app.get("/status")
async def getStatus(): return {"status": "Running"}

# The following are routes to the routers

app.include_router(aRouter.appointmentRouter().router,tags=["appointments"],prefix="/appointments")
app.include_router(cRouter.choreRouter().router,tags=["chores"],prefix="/chores")
app.include_router(pRouter.projectRouter().router,tags=["projects"],prefix="/projects")
app.include_router(tRouter.taskRouter().router,tags=["tasks"],prefix="/tasks")
#app.include_router(ncRouter.router,tags=["testNC"],prefix="/testNC")