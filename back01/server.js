const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //json 파싱
app.use("/auth", authRoutes); //auth 라우트 사용

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
