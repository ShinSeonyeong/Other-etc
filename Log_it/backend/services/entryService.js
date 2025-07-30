const supabase = require("./supabaseClient");

// 📝 기록 저장
exports.createEntry = async ({ user_id, date, type, value, unit }) => {
  const { data, error } = await supabase
    .from("entries")
    .insert([{ user_id, date, type, value, unit }])
    .select();

  if (error) throw error;
  return data[0]; // 삽입된 데이터 1건
};

// 📋 기록 조회 (사용자별 전체)
exports.getEntriesByUser = async (user_id) => {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("user_id", user_id)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};
