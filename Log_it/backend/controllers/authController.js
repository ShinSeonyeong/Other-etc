const { getKakaoToken, getKakaoUserInfo } = require("../services/kakao");
const { registerOrLoginUser } = require("../services/user"); // DB 처리 함수 (직접 구현 필요)
const jwt = require("jsonwebtoken");

exports.kakaoCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("인가 코드가 없습니다.");

  try {
    // 1) 인가 코드로 토큰 받기
    const tokenData = await getKakaoToken(code);

    // 2) 토큰으로 사용자 정보 받기
    const kakaoUser = await getKakaoUserInfo(tokenData.access_token);

    // 3) 사용자 DB 저장 또는 로그인 처리
    const user = await registerOrLoginUser(kakaoUser);

    // 4) JWT 발급
    const jwtToken = jwt.sign(
      { id: user.id, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5) 프론트로 JWT와 닉네임 전달 (쿼리 스트링으로 리다이렉트)
    res.redirect(
      `http://localhost:5173/login-result?token=${jwtToken}&nickname=${encodeURIComponent(
        user.nickname
      )}`
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("로그인 처리 중 오류 발생");
  }
};
