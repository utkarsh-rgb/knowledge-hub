import React from "react";
import Router from "./router";
import Navbar from "./components/Navbar"


export default function App(){
  return (
    <div>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Router />
      </main>
    </div>
  );
}
