

# 📝 AI Article Generator

An end-to-end **AI-powered article generation platform** built with **Next.js**, **FastAPI**, and **OpenAI**, featuring secure authentication, structured content generation, SEO metadata extraction, and downloadable HTML output.

---

## 🚀 Features

* 🔐 **JWT-based Authentication**
* ✍️ **AI-Generated Structured Articles**
* 📊 **SEO Metadata Generation**
* 🌐 **JSON → HTML Transformation**
* ⬇️ **One-click HTML Download**
* 🎨 **Modern Glassmorphism UI (Tailwind CSS)**
* ⚡ **FastAPI async backend**
* 🧠 **OpenAI GPT integration with strict JSON enforcement**

---

## 🏗️ Architecture Overview

```
Next.js Frontend (Port 3001)
        |
        | REST API (JSON)
        v
FastAPI Backend (Port 8000)
        |
        | Prompt-Engineered Requests
        v
OpenAI API (GPT Models)
```

---

## 🧑‍💻 Tech Stack

### Frontend

* **Next.js 14 (Pages Router)**
* **TypeScript**
* **Tailwind CSS**
* **LocalStorage JWT Handling**

### Backend

* **FastAPI**
* **Pydantic**
* **Python-JOSE (JWT)**
* **OpenAI Python SDK**

---

## 🔐 Authentication Flow

1. User logs in via `/login`
2. Backend validates credentials
3. JWT token is issued (HS256)
4. Token is stored in `localStorage`
5. Protected routes require `Authorization: Bearer <token>`

---

## ✍️ Article Generation Flow

1. User enters topic + optional source URL
2. Frontend sends request to `/generate`
3. Backend:

   * Calls OpenAI with **strict JSON prompt**
   * Parses response safely
   * Converts JSON → HTML
   * Saves file to `/generated`
4. Frontend:

   * Displays article & SEO preview
   * Provides downloadable HTML link

---

## 📁 Project Structure

```
Article_generator/
│
├── backend/
│   ├── main.py           # FastAPI entry point
│   ├── auth.py           # JWT auth logic
│   ├── llm.py            # OpenAI integration
│   ├── html_utils.py     # JSON → HTML
│   ├── models.py         # Pydantic schemas
│   ├── config.py         # Environment config
│   └── requirements.txt
│
├── frontend/
│   ├── pages/
│   │   ├── login.tsx
│   │   └── generate.tsx
│   ├── components/
│   │   ├── ArticleView.tsx
│   │   └── SeoView.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── styles/
│   │   └── globals.css
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Setup

### Backend (`backend/.env`)

```env
OPENAI_API_KEY=your_openai_key_here
JWT_SECRET=your_secure_random_string
```

> ⚠️ Never commit `.env` files

---

## ▶️ Running the Project Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- -p 3001
```

Open:

* Frontend → [http://localhost:3001](http://localhost:3001)
* Backend Docs → [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔎 API Endpoints

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | `/login`           | Authenticate & get JWT       |
| POST   | `/generate`        | Generate article (protected) |
| GET    | `/download/{file}` | Download HTML (protected)    |

---

## 🛡️ Security Notes

* JWT tokens are **stateless**
* Secrets loaded via environment variables
* Protected routes use FastAPI dependencies
* GitHub Secret Scanning compliant

---

## 🌱 Future Improvements

* ⏱️ Rate limiting
* 👥 Multi-user roles
* 🗂️ Article history
* 🌍 Deployment (Vercel + Render)
* 📈 Analytics & usage tracking

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

**Sachin Kumar**
B.Tech (ECE) | Full-Stack & AI Developer


Just tell me 👍
