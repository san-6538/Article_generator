import os
from config import OUTPUT_DIR

os.makedirs(OUTPUT_DIR, exist_ok=True)

def json_to_html(article_json: dict, seo: dict):
    # Handle keywords safely (string OR list)
    keywords = seo.get("keywords", "")
    if isinstance(keywords, list):
        keywords = ", ".join(keywords)

    html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{seo.get('title', '')}</title>
<meta name="description" content="{seo.get('description', '')}" />
<meta name="keywords" content="{keywords}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>

<h1>{article_json.get('title', '')}</h1>
<p>{article_json.get('intro', '')}</p>
"""

    for sec in article_json.get("sections", []):
        html += f"""
<h2>{sec.get('heading', '')}</h2>
<p>{sec.get('content', '')}</p>
"""

    html += "<h3>Sources</h3><ul>"
    for s in article_json.get("sources", []):
        html += f"<li><a href='{s}' target='_blank'>{s}</a></li>"

    html += """
</ul>
</body>
</html>
"""
    return html.strip()

def save_html(content: str, name="article.html"):
    path = os.path.join(OUTPUT_DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    return name 
