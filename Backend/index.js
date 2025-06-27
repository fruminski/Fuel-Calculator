const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const expressStatusMonitor = require("express-status-monitor");
const helmet = require("helmet");

const journeyRoutes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(expressStatusMonitor());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/", journeyRoutes); // ✅ use your routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
