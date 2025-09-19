import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>하루를 남기는 작은 습관 💫</h2>
      <KakaoLoginButton />
    </div>
  );
};

export default LoginPage;
