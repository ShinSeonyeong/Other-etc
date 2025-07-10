import React from "react";

const Login = () => {
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:500/auth/kakao/login";
  };

  // return은 함수 내부에 있어야 함!
  return (
    <div>
      <h2>로그인</h2>
      <button onClick={handleKakaoLogin}>카카오로 로그인</button>
    </div>
  );
};

export default Login;
