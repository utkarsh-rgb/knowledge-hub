import React, { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AuthContext } from "../context/AuthContext";

export default function ArticleView(){
  const { id } = useParams();
  const { api, user } = useContext(AuthContext);
  const fetcher = (url) => api.get(url).then(r => r.data);
  const { data, mutate } = useSWR(`/articles/${id}`, fetcher);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  if (!data) return <div>Loading...</div>;

  const canEdit = user?.id === data.createdBy?._id || user?.role === "admin";
  const canDelete = user?.role === "admin";

  const handleSummarize = async () => {
    try {
      setLoading(true);
      await api.post(`/articles/${id}/summarize?provider=mock`); 
      await mutate(); // refresh article
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    } finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete article?")) return;
    await api.delete(`/articles/${id}`);
    nav("/");
  };

  return (
    <div>
      <h1>{data.title}</h1>
      <div style={{ color:"#666" }}>{data.tags?.join(", ")} • By {data.createdBy?.email}</div>
      <article style={{ whiteSpace:"pre-wrap", marginTop:12 }}>{data.content}</article>

      <section style={{ marginTop:20 }}>
        <h3>Summary</h3>
        <div style={{ minHeight:60 }}>{data.summary || "No summary yet"}</div>
        <button onClick={handleSummarize} disabled={loading}>{loading ? "Summarizing..." : "Summarize"}</button>
      </section>

      <div style={{ marginTop:20 }}>
        {canEdit && <Link to={`/articles/edit/${id}`}><button>Edit</button></Link>}
        {/* {canDelete && <button onClick={handleDelete}>Delete</button>} */}
      </div>
    </div>
  );
}
