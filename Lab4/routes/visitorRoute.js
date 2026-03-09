const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.get("/discover", visitorController.exploreCategories);

router.get("/projects", visitorController.viewProjects);

router.get("/", visitorController.homepage);

module.exports = router;
