const express = require("express");
const router = express.Router();
const { createJourney, getJourneys } = require("../controllers/controllers");
const authMiddleware = require("../middleware/authMiddleware");
const prisma = require("../lib/prisma");

// POST /journey
router.post("/journey", authMiddleware, createJourney);

// GET /journeys
router.get("/journeys", authMiddleware, getJourneys);
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "fail", db: "disconnected" });
  }
});

module.exports = router;
