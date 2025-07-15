// frontend/src/UserProfile.js
import React from 'react';

function UserProfile({ user }) {
  const nickname = user.properties?.nickname;
  const profileImage = user.properties?.profile_image;
  const email = user.kakao_account?.email;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={profileImage} alt="프로필" style={styles.profileImage} />
        <h2 style={styles.nickname}>{nickname}</h2>
        <p style={styles.text}><strong>이메일:</strong> {email}</p>
        <p style={styles.text}><strong>사용자 ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '300px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
  },
  nickname: {
    fontSize: '1.5rem',
    margin: '0.5rem 0',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    margin: '0.3rem 0',
  },
};

export default UserProfile;
