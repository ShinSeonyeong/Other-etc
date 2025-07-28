import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>기록 웹앱 로그인</h2>
      <KakaoLoginButton />
    </div>
  );
};

export default LoginPage;
