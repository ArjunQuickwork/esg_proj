from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from fastapi_plugin.fast_api_client import Auth0FastAPI
import requests
from dotenv import load_dotenv
import os

load_dotenv(verbose=True)

ALGORITHMS = ["RS256"]

security = HTTPBearer()

jwks = requests.get(
    f"https://{os.getenv('AUTH0_DOMAIN')}/.well-known/jwks.json"
).json()

def verify_token(token: str):
    try:
        header = jwt.get_unverified_header(token)
        # key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
        key = jwks["keys"][0]["kid"]

        print(key)
        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256", "HS256", "ES256"],
            audience=os.getenv('API_AUDIENCE'),
            issuer=f"https://{os.getenv('AUTH0_DOMAIN')}/",
        )
        # print(payload)
        return payload
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Invalid token")

def get_user(credentials: HTTPAuthorizationCredentials =Depends(security)):
    return verify_token(credentials.credentials)

auth0 = Auth0FastAPI(
   domain=os.getenv("AUTH0_DOMAIN"),
   audience=os.getenv("API_AUDIENCE")
)