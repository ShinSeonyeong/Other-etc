const entryService = require("../services/entryService");

// 기록 저장 핸들러
exports.createEntry = async (req, res) => {
  // JWT 미들웨어가 req.user 세팅했다고 가정
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: "인증 정보가 없습니다." });
  }

  const { date, type, value, unit } = req.body;

  if (!type || !value) {
    return res
      .status(400)
      .json({ message: "필수 항목(type, value)이 누락되었습니다." });
  }

  // 날짜가 없으면 오늘 날짜 자동 지정 (yyyy-mm-dd)
  const dateValue = date || new Date().toISOString().slice(0, 10);

  try {
    // 서비스에 기록 생성 요청
    const entry = await entryService.createEntry({
      user_id,
      date: dateValue,
      type,
      value,
      unit,
    });

    // 성공 응답
    res.status(201).json({ message: "기록 저장 성공", data: entry });
  } catch (error) {
    console.error("기록 저장 오류:", error.message);
    res.status(500).json({ message: "기록 저장 실패" });
  }
};

// 기록 조회 핸들러
exports.getEntries = async (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({ message: "인증 정보가 없습니다." });
  }

  try {
    // 해당 사용자 기록 목록 조회 요청
    const entries = await entryService.getEntriesByUser(user_id);

    // 성공 응답
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error("기록 조회 오류:", error.message);
    res.status(500).json({ message: "기록 조회 실패" });
  }
};
