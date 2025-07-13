# Journey Cost Calculator 🚗

The Journey Cost Calculator is a React-based application that helps users estimate the **real-world fuel cost** of a car journey based on start/end postcodes, fuel price, and vehicle efficiency. It also provides insights into **CO₂ emissions**, **motorway vs non-motorway distance**, and **fuel consumption at different speeds**.

🔗 **Live App**: [https://journeycost.netlify.app](https://journeycost.netlify.app)

---

[![Uptime Status](https://betteruptime.com/status-badges/v1/monitor/<your-monitor-id>.svg)](https://journey-app-status.betteruptime.com/)

## ✨ Features

- 📍 **Postcode-Based Routing** – Enter start and end location to generate a route
- 📏 **Distance Calculation** – Automatic calculation of journey distance
- ⛽ **Fuel Price Input** – Input fuel cost in pence/litre for real-time estimates
- 🔁 **MPG ↔ L/100km Toggle** – Easily switch between imperial and metric units
- 📊 **Cost Breakdown** – See fuel needed, cost per mile, and total cost
- 🛣️ **Speed Efficiency Estimates** – Compare cost at 60, 70, and 80 mph
- 🌿 **CO₂ Emission Estimator** – Based on fuel type and distance
- 🗺️ **Interactive Map** – View the route live using OpenStreetMap

---

## ⚙️ Technologies Used

- **React** – Front-end framework
- **Geoapify API** – Geocoding + route data
- **OpenStreetMap** – Mapping and route visualization
- **Custom CSS** – Responsive UI styling and animations
- **Netlify** – Hosting & deployment

---

## 🛠️ Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fruminski/Fuel-Calculator.git


2. **Navigate to the project folder:**

   ```bash
   cd Fuel-Calculator


3. **Install dependencies:**

   ```bash
   npm install


4. **Add your Geoapify API key:**

   Create a .env file in the root directory and add:
   ```bash
   REACT_APP_GEOAPIFY_KEY=your_key_here


6. **Start the app:**

   ```bash
   npm start
