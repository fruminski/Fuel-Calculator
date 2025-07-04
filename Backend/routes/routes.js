const express = require("express");
const router = express.Router();
const { createJourney, getJourneys } = require("../controllers/controllers");
const authMiddleware = require('../middleware/authMiddleware');

// POST /journey
router.post("/journey", authMiddleware, createJourney);

// GET /journeys
router.get("/journeys", authMiddleware, getJourneys);

module.exports = router;
