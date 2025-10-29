import React, { useContext } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/AuthContext";

export default function AdminUsers(){
  const { api } = useContext(AuthContext);
  const fetcher = (url) => api.get(url).then(r => r.data);
  const { data, error } = useSWR("/admin/users", fetcher);

  if (error) return <div>Error loading users</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth:900, margin:"20px auto" }}>
      <h2>All Users</h2>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <th>Email</th><th>Name</th><th>Role</th><th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map(u => (
            <tr key={u._id}>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.role}</td>
              <td style={tdStyle}>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tdStyle = { padding: "8px 6px", borderBottom: "1px solid #eee" };
