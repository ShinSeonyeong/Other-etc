import { useEffect, useState } from "react";
import "./RecordForm.css";
import { message } from "antd";
import "antd/dist/reset.css"; // antd 스타일 적용

const RecordForm = ({ onSubmit, editingRecord }) => {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState(null); // 1~10
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [bowel, setBowel] = useState("");
  const [gratitude, setGratitude] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setMood(editingRecord.mood || "");
      setEnergy(editingRecord.energy || 0);
      setExercise(editingRecord.exercise || "");
      setWeight(editingRecord.weight || "");
      setBowel(editingRecord.bowel || "");
      setGratitude(editingRecord.gratitude || "");
    } else {
      setMood("");
      setEnergy(0);
      setExercise("");
      setWeight("");
      setBowel("");
      setGratitude("");
    }
  }, [editingRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 에너지 선택 여부 체크
    if (energy === 0 || energy === null) {
      message.warning("에너지를 선택해주세요!");
      return; // submit 막기
    }

      onSubmit({
    mood: mood || null,          // 빈 문자열은 null로
    energy,
    exercise: exercise || null,  // 빈 문자열은 null로
    weight: weight === "" ? null : Number(weight), // 숫자형 변환 + 빈값은 null
    bowel: bowel || null,
    gratitude: gratitude || null,
  });

  if (!editingRecord) {
    setMood("");
    setEnergy(0);
    setExercise("");
    setWeight("");
    setBowel("");
    setGratitude("");
  }
  
    if (!editingRecord) {
      setMood("");
      setEnergy(0);
      setExercise("");
      setWeight("");
      setBowel("");
      setGratitude("");
    }
  };

  const handleCancel = () => {
    setMood("");
    setEnergy(0);
    setExercise("");
    setWeight("");
    setBowel("");
    setGratitude("");
    onSubmit(null);
  };

  return (
    <form className="record-form" onSubmit={handleSubmit}>

      {/* 기분 */}
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

      {/* 에너지 / 스트레스 */}
      <div className="form-group">
        <label>에너지 게이지 🚀</label>
        <div className="stars">
          {[...Array(10)].map((_, idx) => {
            const starNum = idx + 1;
            return (
              <span
                key={starNum}
                className={starNum <= energy ? "star filled" : "star"}
                onClick={() => setEnergy(starNum)}
              >
                ★
              </span>
            );
          })}
        </div>
      </div>

      {/* 운동 */}
      <div className="form-group">
        <label>운동</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="예: 요가 30분, 걷기 등"
        />
      </div>

      {/* 몸무게 */}
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

      {/* 배변활동 */}
      <div className="form-group">
        <label>배변활동</label>
        <input
          type="text"
          value={bowel}
          onChange={(e) => setBowel(e.target.value)}
          placeholder="예: 정상, 불편함 등"
        />
      </div>

      {/* 감사일기 */}
      <div className="form-group">
        <label>감사일기</label>
        <textarea
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          placeholder="오늘 감사했던 일 3가지 적어보기"
        />
      </div>

      {/* 버튼 */}
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {editingRecord ? "수정 완료 💾" : "기록 저장 💾"}
        </button>
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
