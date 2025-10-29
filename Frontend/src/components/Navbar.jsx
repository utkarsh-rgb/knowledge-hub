import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav style={navStyle}>
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <Link to="/" style={logoStyle}>Knowledge Hub</Link>
      </div>

      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
        {user ? (
          <>
            <span style={{ fontSize:13, color:"#eee" }}>{user.email}</span>
            {user.role === "admin" && <Link to="/admin/users">Users</Link>}
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  background: "#0f172a",
  color: "#fff"
};

const logoStyle = { color: "#fff", fontWeight: 700, textDecoration: "none" };
const btnStyle = { padding: "6px 10px", cursor: "pointer" };
