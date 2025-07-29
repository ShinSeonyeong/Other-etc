// frontend/src/components/RecordForm.jsx
import { useState } from "react";
import "./RecordForm.css"; // ✅ CSS 따로 분리

const RecordForm = ({ onSubmit }) => {
  const [mood, setMood] = useState("");
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [bowel, setBowel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mood, exercise, weight, bowel });
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

      <button type="submit" className="submit-btn">
        💾 기록 저장
      </button>
    </form>
  );
};

export default RecordForm;
