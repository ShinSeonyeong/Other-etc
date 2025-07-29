const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("인증 정보가 없습니다.");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("유효하지 않은 토큰입니다.");

    req.user = user; // req에 사용자 정보 넣기
    next();
  });
};

module.exports = authenticateJWT;
