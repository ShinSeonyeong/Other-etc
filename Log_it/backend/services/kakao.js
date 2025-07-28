const axios = require("axios");
const qs = require("querystring");

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

console.log("KAKAO_REST_API_KEY:", REST_API_KEY);
console.log("KAKAO_REDIRECT_URI:", REDIRECT_URI);
console.log("KAKAO_CLIENT_SECRET:", CLIENT_SECRET);

// 환경 변수 확인
if (!REST_API_KEY || !REDIRECT_URI || !CLIENT_SECRET) {
  throw new Error(
    "Missing required Kakao environment variables (KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI, KAKAO_CLIENT_SECRET)"
  );
}

exports.getKakaoToken = async (code) => {
  try {
    const payload = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
      client_secret: CLIENT_SECRET,
    };

    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify(payload), // payload를 URL-encoded 형식으로 변환
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Kakao token error:", error.response?.data || error.message);
    throw new Error(`Failed to get Kakao token: ${error.message}`);
  }
};

exports.getKakaoUserInfo = async (accessToken) => {
  try {
    const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Kakao user info error:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to get Kakao user info: ${error.message}`);
  }
};
