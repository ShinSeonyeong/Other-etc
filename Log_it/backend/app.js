require("dotenv").config(); // ✅ .env 로드
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const entryRoutes = require("./routes/entryRoutes");
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-tau-one-76.vercel.app",
  "https://frontend-tau-one-76.vercel.app/record"
];

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);

app.use(express.json()); // ✅ JSON 파싱

// ✅ 라우트 등록
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/entries", entryRoutes);

// 등록된 라우트가 없을 경우
app.use((req, res) => {
  res.status(404).json({ message: "요청한 경로를 찾을 수 없습니다." });
});

// 오류 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack); // 서버 콘솔에 에러 출력
  res.status(500).json({ message: "서버 내부 오류" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
