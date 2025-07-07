const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const expressStatusMonitor = require("express-status-monitor");
const helmet = require("helmet");

const journeyRoutes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(expressStatusMonitor());

app.use("/auth", authRoutes);
app.use("/", journeyRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
