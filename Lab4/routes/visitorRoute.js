const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Visitor home page");
});
// Explore categories
router.get("/discover", (req, res) => {
  res.send("Explore categories");
});

// View projects
router.get("/projects", (req, res) => {
  res.send("View project ideas");
});

module.exports = router;
