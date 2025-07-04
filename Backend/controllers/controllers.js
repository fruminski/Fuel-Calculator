const prisma = require("../lib/prisma");

// Create new journey
const createJourney = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { start, end, distance, mpg, fuelCost, co2 } = req.body;

    const journey = await prisma.journey.create({
      data: {
        start,
        end,
        distance: parseFloat(distance),
        mpg: parseFloat(mpg),
        fuelCost: parseFloat(fuelCost),
        co2: parseFloat(co2),
        userId, // ensures the journey is linked to the user
      },
    });

    res.status(201).json(journey);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to save journey", details: err.message });
  }
};

// Get all journeys
const getJourneys = async (req, res) => {
  try {
    const journeys = await prisma.journey.findMany();
    res.json(journeys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch journeys" });
  }
};

module.exports = { createJourney, getJourneys };
