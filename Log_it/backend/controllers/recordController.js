const supabase = require("../services/supabaseClient");

exports.saveRecord = async (req, res) => {
  try {
    const userId = req.user.id; // authenticateJWT에서 세팅됨
    const { mood, exercise, weight, bowel } = req.body;

    const { data, error } = await supabase
      .from("records")
      .insert([{ user_id: userId, mood, exercise, weight, bowel }])
      .select()
      .single();

    if (error) {
      console.error("saveRecord error:", error);
      return res.status(500).json({ message: "기록 저장 실패", error: error.message });
    }

    console.log("받은 기록:", { userId, mood, exercise, weight, bowel });
    return res.json({ message: "기록이 저장되었습니다.", record: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "서버 오류" });
  }
};
