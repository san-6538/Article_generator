from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from jose.exceptions import JWTError
from config import JWT_SECRET, JWT_ALGORITHM

bearer_scheme = HTTPBearer()

VALID_USER = {
    "username": "admin",
    "password": "password"
}

def login(u, p):
    if u == VALID_USER["username"] and p == VALID_USER["password"]:
        token = jwt.encode({"sub": u}, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token
    raise HTTPException(status_code=401, detail="Invalid credentials")

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    try:
        jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
