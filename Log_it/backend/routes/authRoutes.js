const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/kakao/callback", authController.kakaoCallback);

module.exports = router;
