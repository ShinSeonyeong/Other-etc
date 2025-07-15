import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const nickname = query.get("nickname");
    const email = query.get("email");
    const profile_image = query.get("profile_image");

    if (nickname && email) {
      setUser({ nickname, email, profile_image });

      setTimeout(() => {
        naviagte("/attendance", { state: { nickname, email, profile_image } });
      }, 2000);
    }
  }, [location, naviagte]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h2>환영합니다, {user.nickname}님!</h2>
          <img
            src={user.profile_image}
            alt="프로필"
            width="100"
            style={{ borderRadius: "50%" }}
          />
          <p>{user.email}</p>
          <p>잠시 후 출결 화면으로 이동합니다...</p>
        </>
      ) : (
        <p>로그인 중...</p>
      )}
    </div>
  );
};

export default LoginSuccess;
