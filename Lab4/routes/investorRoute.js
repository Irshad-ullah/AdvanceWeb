const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Investor Route");
});

router.get("/discover", (req, res) => {
  res.send("Investor discover projects");
});

module.exports = router;
