# Imports
from beanie import PydanticObjectId
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import ( AuthenticationBackend, BearerTransport, JWTStrategy )
from fastapi_users_db_beanie import BeanieUserDatabase, ObjectIDIDMixin
#from fastapi_users import db
#from httpx_oauth.clients.google import GoogleOAuth2
from typing import Optional
import os

# Local imports
from configurations.database import get_user_db, User

# Used 1password to generate a 32 alfanumeric secret
# Wouldn't normally disclose the secret, but this is for a school project
SECRET = "L43juhs46P3kr.PL9m-9NEFVmTNJmcFL"

class UserManager(ObjectIDIDMixin, BaseUserManager[User, PydanticObjectId]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET
    
    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User { user.id } has registered.")
        
    async def on_after_forgot_password(self, user: User, token: str, request: Optional[Request] = None):
        print(f"User { user.id } has forgot their password. Reset token: { token }")
    
    async def on_after_request_verify(self, user: User, token: str, request: Optional[Request] = None):
        print(f"Verification requested for user { user.id }. Verification token: { token }")
    
async def get_user_manager(user_db: BeanieUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)
    
bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)

auth_backend = AuthenticationBackend(name="jwt", transport=bearer_transport, get_strategy=get_jwt_strategy)

fastapi_users = FastAPIUsers[User, PydanticObjectId](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)