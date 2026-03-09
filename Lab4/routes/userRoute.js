const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("User Signup Route");
});

router.post("/login", (req, res) => {
  res.send("User Login Route");
});

module.exports = router;
