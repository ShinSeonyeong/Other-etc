const express = require('express');
const router = express.Router();
const { getKakaoToken, getKakaoUserInfo } = require('../services/kakao');

router.post('/kakao', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenData = await getKakaoToken(code);
    const userInfo = await getKakaoUserInfo(tokenData.access_token);

    // TODO: Supabase에서 로그인 or 회원가입 처리
    // 예: supabase.from('users').upsert({...userInfo})

    res.json({ user: userInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '카카오 로그인 실패' });
  }
});

module.exports = router;
