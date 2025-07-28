import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginResult = () => {
  const navigate = useNavigate();
  const hasHandled = useRef(false); // ✅ 중복 방지용

  useEffect(() => {
    if (hasHandled.current) return; // 이미 처리했으면 무시
    hasHandled.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const nickname = params.get("nickname");

    if (token) {
      localStorage.setItem("jwt", token);
      alert(`환영합니다, ${nickname}님!`);
      navigate("/dashboard");
    } else {
      alert("로그인에 실패했습니다.");
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default LoginResult;
