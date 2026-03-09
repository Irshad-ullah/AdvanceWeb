const express = require("express");
const router = express.Router();
const creatorController = require("../controllers/creatorController");

router.get("/", creatorController.dashboard);

router.post("/join", creatorController.joinCommunity);

router.get("/learn", creatorController.learnCreation);

module.exports = router;
