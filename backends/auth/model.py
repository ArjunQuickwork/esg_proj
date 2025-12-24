from pydantic import BaseModel, Field, EmailStr


class UserSchema(BaseModel):
    email: EmailStr = Field(description="The username of the user")
    password: str = Field(description="The password of the user")
    name: str = Field(description="The name of the user")

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "password": "admin",
                "name": "admin"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(description="The username of the user")
    password: str = Field(description="The password of the user")

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "password": "admin"
            }
        }