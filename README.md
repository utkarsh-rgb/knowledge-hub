# Knowledge Hub

An **Express.js + MongoDB** backend that summarizes articles using **Large Language Models (LLMs)** such as **OpenAI GPT-3.5** and **Google Gemini Pro**.  
The summarization logic is **abstracted**, allowing you to easily switch between AI providers.

---

## 🚀 Features

- 🧩 **Swappable LLM Providers** — Choose between `openai` or `gemini`
- ✨ **Automatic Summary Storage** — Summaries saved in MongoDB
- 🔐 **JWT Authentication** — Protected route with middleware
- ⚙️ **Clean Architecture** — Service + Controller separation

---


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/article-summarizer-api.git
cd article-summarizer-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a `.env` file
Add your credentials inside the `.env` file:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourdb
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the server
```bash
npm start
```

Server will start on:
```
http://localhost:4000
```

---

## 🧱 MongoDB Article Schema

```js
{
  "_id": "6720d18f13a",
  "title": "AI in Web Development",
  "content": "Artificial Intelligence is transforming how we build web apps...",
  "summary": "AI is revolutionizing web app development through automation and personalization."
}
```

---

## 🔑 Authentication

All article routes are protected using JWT authentication.  
Include the token in your request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🧩 API Endpoints

### ➤ Summarize Article
**POST** `/articles/:id/summarize`

Generates a summary using the selected AI provider and stores it in MongoDB.

#### Request Body
```json
{
  "provider": "gemini" // or "openai"
}
```

#### Example cURL
```bash
curl -X POST http://localhost:4000/articles/6720d18f13a/summarize   -H "Authorization: Bearer <token>"   -H "Content-Type: application/json"   -d '{"provider":"openai"}'
```

#### Example Response
```json
{
  "message": "✅ Summary generated successfully using OPENAI",
  "summary": "This article explains how AI is transforming web applications..."
}
```

---

## 🧠 LLM Service Logic

The summarization logic is centralized in `/services/llmService.js`:

```js
const summary = await summarizeWithLLM(content, provider);
```

Available providers:
- `"openai"` → Uses GPT-3.5 Turbo
- `"gemini"` → Uses Gemini Pro

You can add new providers easily by extending this file.

---

## ⚡ Example Flow

1. User logs in and obtains a JWT token  
2. Client sends a `POST /articles/:id/summarize` request  
3. Server fetches article content from MongoDB  
4. Selected LLM provider generates the summary  
5. Summary is stored in the database and returned  

---

## 🧰 Tech Stack

- **Node.js + Express.js** — Server  
- **MongoDB + Mongoose** — Database  
- **OpenAI API** — GPT-3.5 Turbo summarization  
- **Google Gemini API** — Gemini Pro summarization  
- **JWT** — Authentication  

---

## 📜 Example .env File

```env
PORT=4000
MONGODB_URI=mongodb+srv://utkarshgupta:<password>@cluster0.mongodb.net/llmDB
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXX
JWT_SECRET=mysecretkey
```

---

## 🧩 Future Enhancements

- 🧾 Cache summaries to minimize API costs  
- 🔁 Add `force: true` flag to regenerate summaries  
- 📚 Add support for Claude or Mistral models  
- 🧠 Auto-detect best provider based on context  

---

## 👨‍💻 Author

**Utkarsh Gupta**  
Final Year B.Tech (CSE) | Parul University  
📧 [utkarshgupta.976274@gmail.com](mailto:utkarshgupta.976274@gmail.com)  
💻 [GitHub Profile](https://github.com/utkarsh-rgb)
