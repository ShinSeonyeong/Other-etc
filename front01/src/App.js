// frontend/src/App.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import KakaoLogin from './kakaoLogin';

function App() {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      // 백엔드로 인가 코드 전달
      axios.post('http://localhost:4000/auth/kakao', { code })
        .then(res => {
          console.log('로그인 성공:', res.data);
          // TODO: JWT 저장 등 로그인 상태 유지
        })
        .catch(err => console.error('로그인 실패:', err));
    }
  }, [location]);

  return (
    <div>
      <h1>카카오 로그인 데모</h1>
      <KakaoLogin />
    </div>
  );
}

export default App;
