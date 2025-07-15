require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors({
  origin: 'http://localhost:4001',
  credentials: true,
}));
app.use(express.json());

app.use("/",indexRouter);
app.use('/auth', authRouter);

app.listen(8000, () => {
  console.log('서버 실행: http://localhost:8000');
});