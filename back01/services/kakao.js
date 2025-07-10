const axios = require('axios');
require('dotenv').config();  // .env 파일 불러오기

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

exports.getKakaoToken = async (code) => {
  const payload = {
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code,
    client_secret: CLIENT_SECRET,
  };

  const res = await axios.post('https://kauth.kakao.com/oauth/token', null, {
    params: payload,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  return res.data; // { access_token, refresh_token, ... }
};

exports.getKakaoUserInfo = async (accessToken) => {
  const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data; // 사용자 정보 반환
};
