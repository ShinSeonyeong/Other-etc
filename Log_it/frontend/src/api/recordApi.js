// frontend/src/api/recordApi.js
export const postRecord = async (recordData) => {
  const token = localStorage.getItem("jwt"); // JWT 토큰 (로그인 후 저장됨)

  const res = await fetch("http://localhost:4000/api/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 인증 헤더 포함
    },
    body: JSON.stringify(recordData),
  });

  if (!res.ok) {
    throw new Error("기록 저장 실패");
  }

  return await res.json();
};
