import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useSWR from "swr";
import MarkdownEditor from "../components/MarkdownEditor";

export default function ArticleForm({ edit }) {
  const { id } = useParams();
  const { api } = useContext(AuthContext);
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const fetcher = (url) => api.get(url).then(r => r.data);
  const { data } = useSWR(edit && id ? `/articles/${id}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setTags((data.tags||[]).join(","));
    }
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { title, content, tags: tags.split(",").map(t=>t.trim()).filter(Boolean) };
    if (edit) {
      await api.put(`/articles/${id}`, payload);
    } else {
      await api.post("/articles", payload);
    }
    nav("/");
  };

  return (
    <form onSubmit={submit}>
      <div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
      </div>
      <div>
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags (comma separated)" />
      </div>
      <div>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>
      <button type="submit">{edit ? "Save" : "Create"}</button>
    </form>
  );
}
