const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.post("/", authenticateJWT, recordController.saveRecord);
router.get("/", authenticateJWT, recordController.getRecords);
router.delete("/:id", authenticateJWT, recordController.deleteRecord);
router.put("/:id", authenticateJWT, recordController.updateRecord);

module.exports = router;
