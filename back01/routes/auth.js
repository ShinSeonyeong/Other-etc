require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const Router = express.Router();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI, SUPABASE_JWT_SECRET } =
  process.env;

// 1. 카카오 로그인 리디렉션 (프론트에서 이 URL로 이동)
Router.get("/kakao/login", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}`;
  res.redirect(kakaoAuthURL);
});

// 2. 카카오 로그인 콜백 (카카오에서 리디렉션된 후 이 URL로 이동)
Router.get("/kakao/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 카카오 토큰 요청
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: KAKAO_CLIENT_ID,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tockenResponse.data.access_token;

    // 카카오 사용자 정보 요청
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const kakaoUser = userResponse.data;
    const userId = kakaoUser.id;
    const nickname = kakaoUser.properties.nickname || "no-name";

    // supabase JWT 생성
    const payload = {
      sub: userId.toString(), // 사용자 ID
      name: nickname, // 사용자 이름
      role: "user", // 사용자 역할
      email: kakaoUser.kakao_account?.email || "", // 이메일
    };

    const supabaseToken = jwt.sign(payload, SUPABASE_JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h", // 토큰 유효 기간
    });

    // 프론트엔드로 JWT 전달
    res.redirect(
      `http://localhost:3030/oauth/kakao/callback?token=${supabaseToken}`
    );
  } catch (error) {
    console.error("카카오 로그인 에러:", error.response?.data || error.message);
    res.status(500).send("로그인 실패");
  }
});

module.exports = Router;
