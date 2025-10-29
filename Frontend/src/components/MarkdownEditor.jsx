import React from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({ value, onChange }){
  return (
    <div style={{ display:"flex", gap:12 }}>
      <textarea value={value} onChange={e=>onChange(e.target.value)} style={{ width:"50%", minHeight:300 }} />
      <div style={{ width:"50%", borderLeft:"1px solid #eee", paddingLeft:12 }}>
        <h4>Preview</h4>
        <div style={{ minHeight:300, background:"#fff", padding:8 }}>
          <ReactMarkdown>{value || "Nothing to preview"}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
