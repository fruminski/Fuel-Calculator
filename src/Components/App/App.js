import "./App.css";

import Input from "../Input";
import { useState } from "react";

function App() {
  const [cost, setCost] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(null);
  const [distance, setDistance] = useState(0);
  const [liters, setLiters] = useState(0);
  const [mpgToLiters, setMpgToLiters] = useState(0);

  const [startPostcode, setStartPostcode] = useState(null);
  const [endPostcode, setEndPostcode] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [startLat, setStartLat] = useState(null);
  const [endLon, setEndLon] = useState(null);
  const [endLat, setEndLat] = useState(null);

  async function fetchStartLocation() {
    const response = await fetch(
      `https://geoapify-address-autocomplete.p.rapidapi.com/v1/geocode/autocomplete?text=${startPostcode}&type=postcode&bias=proximity%3A10.485306%2C48.852565`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "33a69046d1msh2b7978ec110ac74p164745jsn199819eb8658",
          "X-RapidAPI-Host": "geoapify-address-autocomplete.p.rapidapi.com"
        }
      }
    );
    const data = await response.json();
    setStartLon(data.features[0].properties.lon);
    setStartLat(data.features[0].properties.lat);
  }

  async function fetchEndLocation() {
    const response = await fetch(
      `https://geoapify-address-autocomplete.p.rapidapi.com/v1/geocode/autocomplete?text=${endPostcode}&type=postcode&bias=proximity%3A10.485306%2C48.852565`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "33a69046d1msh2b7978ec110ac74p164745jsn199819eb8658",
          "X-RapidAPI-Host": "geoapify-address-autocomplete.p.rapidapi.com"
        }
      }
    );
    const data = await response.json();
    setEndLon(data.features[0].properties.lon);
    setEndLat(data.features[0].properties.lat);
  }

  async function fetchDistance(startLat, startLon, endLat, endLon) {
    const response = await fetch(
      `https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=${startLat}%2C${startLon}&destinations=${endLat}%2C${endLon}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "33a69046d1msh2b7978ec110ac74p164745jsn199819eb8658",
          "X-RapidAPI-Host": "trueway-matrix.p.rapidapi.com"
        }
      }
    );
    const data = await response.json();
    let milesDistance = data.distances[0][0];
    setDistance(milesDistance * 0.0006213712);
  }

  function grabLocation() {
    fetchStartLocation();
    fetchEndLocation();
    fetchDistance(startLat, startLon, endLat, endLon);
  }

  console.log("distance:", startLat, startLon, endLat, endLon, distance);

  function handleFuelPrice(e) {
    setFuelPrice(e.target.value);
  }

  function handleDistance(e) {
    setDistance(e.target.value);
  }

  function handleMpg(e) {
    setMpgToLiters((282.48 / e.target.value).toFixed(2));
  }

  async function calculate() {
    setCost(
      ((fuelPrice / 100) * ((distance * 1.609344 * mpgToLiters) / 100)).toFixed(
        2
      )
    );
    setLiters(((distance * 1.609344 * mpgToLiters) / 100).toFixed(2));
  }

  return (
    <div className="App">
      <div className="imgLeft"></div>
      <div className="calculator-container">
        <Input
          placeholder="Postcode start"
          handleChange={(e) => setStartPostcode(e.target.value)}
        />
        <Input
          placeholder="Postcode end"
          handleChange={(e) => setEndPostcode(e.target.value)}
        />
        <button onClick={grabLocation}>Calculate distance</button>
        <p>Distance: {distance} miles</p>
        <Input
          type="number"
          value={fuelPrice}
          placeholder="Fuel price - pense/ litre"
          handleChange={handleFuelPrice}
        />
        <Input
          type="number"
          value={distance}
          placeholder="Distance in miles"
          handleChange={handleDistance}
        />
        <Input type="number" placeholder="MPG" handleChange={handleMpg} />
        <button onClick={calculate}>Calculate</button>
        <p>Journey Cost: {cost} £</p>
        <p>Liters needed: {liters} L</p>
      </div>
    </div>
  );
}

export default App;
