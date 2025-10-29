import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children, adminOnly = false }){
  const { token, user } = useContext(AuthContext);
  const loc = useLocation();

  if (!token) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (adminOnly && user?.role !== "admin") return <div>Forbidden</div>;
  return children;
}
