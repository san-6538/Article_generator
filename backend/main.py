import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from models import GenerateRequest, GenerateResponse
from auth import login, verify_token
from llm import generate_with_openai
from html_utils import json_to_html, save_html
from config import OUTPUT_DIR

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
def do_login(username: str, password: str):
    return {"token": login(username, password)}

@app.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest, _: str = Depends(verify_token)):
    article, seo = generate_with_openai(req.query, req.url)
    html = json_to_html(article, seo)

    filename = save_html(html)  # returns ONLY filename

    return GenerateResponse(
        article_json=article,
        seo=seo,
        html_string=html,
        download_path=f"/download/{filename}"
    )

@app.get("/download/{filename}")
def download(filename: str, _: str = Depends(verify_token)):
    file_path = os.path.join(OUTPUT_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        file_path,
        media_type="text/html",
        filename=filename
    )
