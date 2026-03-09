const express = require("express");
const router = express.Router();

// Join creator community
router.post("/join", (req, res) => {
  res.send("Creator joined community");
});

// Learn creation
router.get("/learn", (req, res) => {
  res.send("Creator learning page");
});

module.exports = router;
