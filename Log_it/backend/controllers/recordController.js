exports.saveRecord = async (req, res) => {
  const userId = req.user.id; // authenticateJWT 미들웨어에서 추출한 사용자 정보
  const { mood, exercise, weight, bowel } = req.body;

  // TODO: DB에 저장 로직 추가 (예: Supabase, PostgreSQL 등)

  console.log("받은 기록:", { userId, mood, exercise, weight, bowel });

  res.json({ message: "기록이 저장되었습니다." });
};
