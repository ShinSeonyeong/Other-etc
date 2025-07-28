// backend/services/user.js

exports.registerOrLoginUser = async (kakaoUser) => {
  // kakaoUser: 카카오에서 받은 사용자 정보
  const user = {
    id: kakaoUser.id,
    nickname: kakaoUser.properties?.nickname || "카카오유저",
    email: kakaoUser.kakao_account?.email || null,
  };

  // 여기선 DB 없이 더미 객체로 바로 반환 (추후 Supabase 연결 예정)
  return user;
};
