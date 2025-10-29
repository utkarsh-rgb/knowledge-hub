import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ArticleView from "./pages/ArticleView";
import ArticleForm from "./pages/ArticleForm";
import AdminUsers from "./pages/AdminUsers";
import AuthRoute from "./components/AuthRoute";

export default function Router(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={
        <AuthRoute><Dashboard/></AuthRoute>
      } />
      <Route path="/articles/new" element={<AuthRoute><ArticleForm/></AuthRoute>} />
      <Route path="/articles/edit/:id" element={<AuthRoute><ArticleForm edit/></AuthRoute>} />
      <Route path="/articles/:id" element={<AuthRoute><ArticleView/></AuthRoute>} />
      <Route path="/admin/users" element={<AuthRoute adminOnly><AdminUsers/></AuthRoute>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
