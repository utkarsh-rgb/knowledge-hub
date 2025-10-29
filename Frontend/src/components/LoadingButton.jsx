import React from "react";

export default function LoadingButton({ loading, children, ...props }){
  return (
    <button {...props} disabled={loading || props.disabled} style={{ opacity: loading ? 0.7 : 1 }}>
      {loading ? "⏳ " + (props.loadingText || "Please wait") : children}
    </button>
  );
}
