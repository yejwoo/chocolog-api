const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

// router.get("/", recordController.getRecord);
router.post("/", recordController.updateRecord);

module.exports = router;
