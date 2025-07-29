// src/pages/RecordPage.jsx
import RecordForm from "../components/RecordForm";
import { postRecord } from "../api/recordApi";
import "./RecordPage.css"; // ✅ 별도 스타일 파일 분리

const RecordPage = () => {
  const handleRecordSubmit = async (data) => {
    try {
      const res = await postRecord(data);
      alert("기록이 성공적으로 저장되었습니다!");
      console.log("서버 응답:", res);
    } catch (error) {
      alert("기록 저장에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="record-page">
      <h1>📖 오늘의 기록</h1>
      <p className="subtitle">하루를 정리해보세요 💫</p>
      <RecordForm onSubmit={handleRecordSubmit} />
    </div>
  );
};

export default RecordPage;
