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

exports.getRecords = async (req, res) => {
  try {
    const userId = req.user.id;
    const { data, error } = await supabase
      .from("records")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    console.log("getRecords data:", data);

    if (error) return res.status(500).json({ message: "기록 조회 실패", error: error.message });

    return res.json({ record: data })
  } catch (e) {
    return res.status(500).jsonn({ message: "서버 오류" })
  }
}

exports.deleteRecord = async (req, res) => {
  try {
    const userId = req.user.id; // authenticateJWT에서 세팅됨
    const { id } = req.params;

    // 해당 사용자의 기록만 삭제하도록 조건 추가
    const { data, error } = await supabase
      .from("records")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select();  // 삭제된 데이터를 반환;

    if (error) {
      console.error("deleteRecord error:", error);
      return res.status(500).json({ message: "기록 삭제 실패", error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "삭제할 기록이 없습니다." });
    }

    return res.json({ message: "기록이 삭제되었습니다." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "서버 오류" });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { mood, exercise, weight, bowel } = req.body;

    const { data, error } = await supabase
      .from("records")
      .update({ mood, exercise, weight, bowel })
      .eq("id", id)
      .eq("user_id", userId)
      .select();  // 업데이트된 데이터를 반환

    if (error) {
      console.error("updateRecord error:", error);
      return res.status(500).json({ message: "기록 수정 실패", error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "수정할 기록이 없습니다." });
    }

    return res.json({ message: "기록이 수정되었습니다.", record: data[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "서버 오류" });
  }
};
