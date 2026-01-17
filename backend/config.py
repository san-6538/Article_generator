import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "super-secret")
JWT_ALGORITHM = "HS256"

MODEL_NAME = "gpt-4o-mini"   # or gpt-4.1, gpt-4.1-mini
OUTPUT_DIR = "generated"
