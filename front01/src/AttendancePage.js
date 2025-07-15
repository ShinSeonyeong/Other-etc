import React from 'react';
import { useLocation } from 'react-router-dom';

const AttendancePage = () => {
  const location = useLocation();
  const user = location.state;

  return (
    <div style={{ padding: '30px' }}>
      <h1>출결 시스템</h1>
      {user ? (
        <div>
          <p><strong>이름:</strong> {user.nickname}</p>
          <p><strong>이메일:</strong> {user.email}</p>
          <img src={user.profile_image} alt="프로필" width="80" />
        </div>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default AttendancePage;
