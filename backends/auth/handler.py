import os
import time
from typing import Dict
import dotenv
import jwt
from pydantic import EmailStr

from backends.auth.model import UserLoginSchema

# Load env file
dotenv.load_dotenv(verbose=True)

def sign_jwt(user_id: EmailStr) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 6000 # 100min validity
    }
    token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm=os.getenv("JWT_ALGORITHM"))

    return token_response(token)

def token_response(token: str):
    return {
        "access_token": token
    }

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=[os.getenv("JWT_ALGORITHM")])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}

def check_user(data: UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
    return False

