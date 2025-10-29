import React, { useContext, useState } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/AuthContext";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { api, user } = useContext(AuthContext);
  const [q, setQ] = useState("");

  const fetcher = (url) => api.get(url).then((r) => r.data);
  const { data, error, mutate } = useSWR(() => `/articles?q=${encodeURIComponent(q)}`, fetcher);

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await api.delete(`/articles/${id}`);
      mutate(); // Refresh list
    } catch (err) {
      alert("Failed to delete article");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Articles</h2>
        {user?.role === "user" && (
          <Link to="/articles/new">
            <button>New Article</button>
          </Link>
        )}
      </div>


      <div style={{ marginTop: 12 }}>
        {data.length === 0 ? (
          <div>No articles</div>
        ) : (
          data.map((a) => (
            <ArticleCard
              key={a._id}
              article={a}
              canEdit={user?.role === "admin" || a.authorId === user?._id}
              canDelete={user?.role === "admin" || a.authorId === user?._id}
              onDelete={() => handleDelete(a._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
