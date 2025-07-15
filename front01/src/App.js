// frontend/src/App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import KakaoLogin from "./kakaoLogin";
import UserProfile from "./UserProfile";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("useEffect 실행, location.search:", location.search);
    const code = new URLSearchParams(location.search).get("code");
    console.log("인가 코드:", code);

    if (code) {
      axios
        .post("http://localhost:8000/auth/kakao", { code })
        .then((res) => {
          console.log("서버 응답:", res.data);
          setUser(res.data.user);
          navigate("/profile");
        })
        .catch((err) => console.error("로그인 실패:", err));
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<KakaoLogin />} />
      <Route
        path="/profile"
        element={user ? <UserProfile user={user} /> : <KakaoLogin />}
      />
    </Routes>
  );
}

export default App;
