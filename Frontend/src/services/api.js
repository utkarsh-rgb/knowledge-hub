// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});



// Auth
export async function register(data) { return api.post("/auth/register", data); }
export async function login(data) { return api.post("/auth/login", data); }

// Articles
export async function fetchArticles(params) { return api.get("/articles", { params }); }
export async function createArticle(data) { return api.post("/articles", data); }
export async function getArticle(id) { return api.get(`/articles/${id}`); }
export async function updateArticle(id, data) { return api.put(`/articles/${id}`, data); }
export async function deleteArticle(id) { return api.delete(`/articles/${id}`); }
export async function summarizeArticle(id, provider = "mock") { return api.post(`/articles/${id}/summarize?provider=${provider}`); }

export default api;
