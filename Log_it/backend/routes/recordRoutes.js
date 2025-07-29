const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.post("/", authenticateJWT, recordController.saveRecord);

module.exports = router;
