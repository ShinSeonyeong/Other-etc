const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// 기록 저장
router.post("/", entryController.createEntry);

// 기록 조회
router.get("/", entryController.getEntries);

module.exports = router;
