const express = require("express");
const axios = require("axios");
const router = express.Router();
const { getKakaoToken, getKakaoUserInfo } = require("../services/kakao");

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

router.post("/kakao", async (req, res) => {
  const { code } = req.body;
  try {
    const tokenData = await getKakaoToken(code);
    const userInfo = await getKakaoUserInfo(tokenData.access_token);

    res.json({ user: userInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "카카오 로그인 실패" });
  }
});

// 카카오 callback 처리
router.get("/kakao/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          client_secret: process.env.KAKAO_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // 토큰으로 사용자 정보 받기
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoUser = userResponse.data;

    // 사용자 정보로 로그인 또는 회원가입 처리 (예: Supabase 사용자 등록)
    // res.json(kakaoUser); // 임시로 JSON 응답
    res.redirect(`http://localhost:4000/?code=${code}`);
  } catch (error) {
    console.error('카카오 로그인 에러:', error.response?.data || error.message || error);
    res.status(500).send("로그인 실패");
  }
});



module.exports = router;
