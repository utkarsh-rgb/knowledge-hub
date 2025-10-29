import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({ article, canEdit, canDelete, onDelete }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
      <h3>{article.title}</h3>
      <p>{article.content.slice(0, 100)}...</p>

      <div style={{ marginTop: 8 }}>
        <Link to={`/articles/${article._id}`}>Read</Link>

        {canEdit && (
          <Link to={`/articles/edit/${article._id}`} style={{ marginLeft: 8 }}>
            Edit
          </Link>
        )}

        {canDelete && (
          <button onClick={onDelete} style={{ marginLeft: 8, color: "red" }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
