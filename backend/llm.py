from config import OPENAI_API_KEY, MODEL_NAME
from openai import OpenAI
import json

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_with_openai(query: str, url: str | None = None):
    if not OPENAI_API_KEY:
        raise ValueError("Missing OPENAI_API_KEY")

    prompt = f"""
Generate a structured article based on this request:
{query}

Return STRICT JSON ONLY with this exact format:
{{
  "article": {{
    "title": "string",
    "intro": "string",
    "sections": [
      {{
        "heading": "string",
        "content": "string"
      }}
    ],
    "sources": ["url", "url"]
  }},
  "seo": {{
    "title": "string",
    "description": "string",
    "keywords": ["keyword1", "keyword2"]
  }}
}}
"""

    if url:
        prompt += f"\nContext domain (do not invent facts): {url}"

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a JSON-only response generator. Do not add explanations."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.6,
            max_tokens=2048
        )
    except Exception as e:
        print("OPENAI API ERROR:", e)
        raise RuntimeError("OpenAI API call failed")

    text = response.choices[0].message.content.strip()

    try:
        parsed = json.loads(text)
        return parsed["article"], parsed["seo"]
    except Exception as e:
        print("JSON PARSE ERROR:", e)
        print("RAW TEXT:", text)
        raise ValueError("OpenAI did not return valid JSON")
