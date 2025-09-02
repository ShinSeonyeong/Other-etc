import React from "react";

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 이동
  };

  console.log("REDIRECT_URI:", REDIRECT_URI);

  return (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: "#FEE500",
        padding: "10px 20px",
        borderRadius: 8,
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🟡 카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;
