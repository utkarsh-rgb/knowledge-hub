import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";

export default function Register(){
  const { api, setToken, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      setToken(data.token);
      setUser(data.user);
      nav("/");
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth:480, margin:"32px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display:"grid", gap:12 }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <LoadingButton loading={loading} type="submit">Register</LoadingButton>
        {err && <div style={{ color:"red" }}>{err}</div>}
      </form>
    </div>
  );
}
