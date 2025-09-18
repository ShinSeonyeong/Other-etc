import { useEffect, useState } from "react";
import "./RecordForm.css"; // ✅ CSS 따로 분리

const RecordForm = ({ onSubmit, editingRecord }) => {
  const [mood, setMood] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [bowel, setBowel] = useState("");

  // editingRecord가 바뀔 때마다 폼 값 업데이트 (수정 모드)
  useEffect(() => {
    if (editingRecord) {
      setMood(editingRecord.mood || "");
      setExercise(editingRecord.exercise || "");
      setWeight(editingRecord.weight || "");
      setBowel(editingRecord.bowel || "");
    } else {
      // 새 기록 모드일 때 초기화
      setMood("");
      setExercise("");
      setWeight("");
      setBowel("");
    }
  }, [editingRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mood, exercise, weight, bowel });
    if (!editingRecord) {
      // 새 기록 제출 후 초기화
      setMood("");
      setExercise("");
      setWeight("");
      setBowel("");
    }
  };

  // 편집 취소
  const handleCancel = () => {
    setMood("");
    setExercise("");
    setWeight("");
    setBowel("");
    onSubmit(null); // RecordPage에서 editingRecord를 null로
  };

  return (
    <form className="record-form" onSubmit={handleSubmit}>
      <h2>오늘의 기록을 남겨보세요 🌈</h2>

      <div className="form-group">
        <label>기분</label>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="예: 행복해, 우울해 등"
          required
        />
      </div>

      <div className="form-group">
        <label>운동</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="예: 요가 30분, 걷기 등"
        />
      </div>

      <div className="form-group">
        <label>몸무게 (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="예: 52.5"
          min="0"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label>배변활동</label>
        <input
          type="text"
          value={bowel}
          onChange={(e) => setBowel(e.target.value)}
          placeholder="예: 정상, 불편함 등"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingRecord ? "수정 완료 💾" : "기록 저장 💾"}
        </button>

        {/* 편집 모드일 때만 취소 버튼 표시 */}
        {editingRecord && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            ❌ 취소
          </button>
        )}
      </div>
    </form>
  );
};

export default RecordForm;
