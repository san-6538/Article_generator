from pydantic import BaseModel

class GenerateRequest(BaseModel):
    query: str
    url: str | None = None

class GenerateResponse(BaseModel):
    article_json: dict
    seo: dict
    html_string: str
    download_path: str
