const express = require("express");
const router = express.Router();
const { createJourney, getJourneys } = require("../controllers/controllers");

// POST /journey
router.post("/journey", createJourney);

// GET /journeys
router.get("/journeys", getJourneys);

module.exports = router;
