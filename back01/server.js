const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
