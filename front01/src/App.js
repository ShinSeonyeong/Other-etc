import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabase";
import Login from "./pages/login";

function App() {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      supabase.auth.setSession({ access_token: token, refresh_token: "" });
    }
  }, [location]);

  return (
    <div>
      <h1>출결관리 시스템</h1>
      <Login />
    </div>
  );
}

export default App;
