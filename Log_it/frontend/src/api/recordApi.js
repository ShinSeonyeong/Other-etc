// frontend/src/api/recordApi.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postRecord = async (recordData) => {
  const token = localStorage.getItem("jwt"); // JWT 토큰 (로그인 후 저장됨)
  const res = await fetch(`${API_BASE_URL}/api/records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 인증 헤더 포함
    },
    body: JSON.stringify(recordData),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`기록 저장 실패 (${res.status}) ${msg}`);
  }

  return await res.json();
};
