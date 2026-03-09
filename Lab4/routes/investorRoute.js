const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");

router.get("/", investorController.dashboard);

router.get("/discover", investorController.discoverProjects);

module.exports = router;
