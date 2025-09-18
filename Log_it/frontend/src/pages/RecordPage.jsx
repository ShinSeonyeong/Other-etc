import { useState, useEffect } from "react";
import RecordForm from "../components/RecordForm";
import { postRecord } from "../api/recordApi";
import "./RecordPage.css";
import { motion, AnimatePresence } from "framer-motion"; // 추가

const API_URL = import.meta.env.VITE_API_BASE_URL; // env 사용

const RecordPage = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // 수정 상태

  // GET 기록 조회
  const fetchRecords = async () => {
    const jwt = localStorage.getItem("jwt");
    const res = await fetch(`${API_URL}/api/records`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const data = await res.json();
    setRecords(data.record);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleRecordSubmit = async (data) => {
    if (!data) {
      // 취소 버튼 눌렀을 때
      setEditingRecord(null);
      return; // 더 이상 처리하지 않음
    }

    try {
      const jwt = localStorage.getItem("jwt");

      if (editingRecord) {
        // 수정 모드
        const res = await fetch(`${API_URL}/api/records/${editingRecord.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(data),
        });
        const updated = await res.json();

        setRecords((prev) =>
          prev.map(r => (r.id === editingRecord.id ? updated.record : r))
        );
        setEditingRecord(null); // 편집 종료
        alert("기록이 수정되었습니다!");
      } else {
        // 새 기록 저장
        const res = await postRecord(data);
        setRecords(prev => [res.record, ...prev]);
        alert("기록이 성공적으로 저장되었습니다!");
      }
    } catch (error) {
      console.error(error);
      alert("저장 실패");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      const jwt = localStorage.getItem("jwt");
      const res = await fetch(`${API_URL}/api/records/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (!res.ok) throw new Error("삭제 실패");

      setRecords(prev => prev.filter(record => record.id !== id));
      alert("기록이 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEditClick = (record) => {
    setEditingRecord(record); // 수정할 기록 선택
  };

  return (
    <div className="record-page">
      <h1>📖 오늘의 기록</h1>
      <p className="subtitle">하루를 정리해보세요 💫</p>
      <RecordForm onSubmit={handleRecordSubmit} editingRecord={editingRecord} />

      <div className="record-list">
        <h2>최근 기록</h2>
        {records.length === 0 ? (
          <p>아직 기록이 없습니다.</p>
        ) : (
          <AnimatePresence>
            {records.map((record) => {
              if (!record) return null;
              const createdAt = new Date(record.created_at);

              return (
                <motion.div
                  key={record.id}
                  className="record-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="date">
                    {createdAt.toLocaleDateString("ko-KR")}{" "}
                    {createdAt.toLocaleTimeString("ko-KR")}
                  </div>
                  <div className="details">
                    <span>기분: {record.mood}</span> |{" "}
                    <span>운동: {record.exercise}</span> |{" "}
                    <span>몸무게: {record.weight}kg</span> |{" "}
                    <span>배변: {record.bowel}</span>
                  </div>
                  <button onClick={() => handleEditClick(record)}>✏️ 수정</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(record.id)}
                  >
                    🗑️ 삭제
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default RecordPage;
