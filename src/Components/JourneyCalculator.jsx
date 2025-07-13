import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import MyMap from "./MyMap";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import distanceIco from "../distance.png";
import costIco from "../cost.png";
import gaugeIco from "../gauge.png";

const JourneyCalculator = ({ user, setUser }) => {
  const [cost, setCost] = useState(0);
  const [fuelPrice, setFuelPrice] = useState("");
  const [distanceTotal, setDistanceTotal] = useState(null);
  const [litersNeeded, setLitersNeeded] = useState(0);
  const [mpg, setMpg] = useState("");
  const [liters, setLiters] = useState("");
  const [unit, setUnit] = useState("mpg");
  const [startLon, setStartLon] = useState(null);
  const [startLat, setStartLat] = useState(null);
  const [endLon, setEndLon] = useState(null);
  const [endLat, setEndLat] = useState(null);
  const [startAdress, setStartAddress] = useState("");
  const [endAdress, setEndAddress] = useState("");
  const [motorwayDistance, setMotorwayDistance] = useState(0);
  const [postcodeKey, setPostcodeKey] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [blobClass, setBlobClass] = useState("blob-hidden");
  const [fuelType, setFuelType] = useState("PETROL");
  const [co2Emissions, setCo2Emissions] = useState(0);
  const [costPerMile, setCostPerMile] = useState(0);
  const [costMotorwayAt60, setCostMotorwayAt60] = useState(0);
  const [costMotorwayAt70, setCostMotorwayAt70] = useState(0);
  const [costMotorwayAt80, setCostMotorwayAt80] = useState(0);
  const [costNonMotorway, setCostNonMotorway] = useState(0);
  const [nonMotorwayDistance, setNonMotorwayDistance] = useState(0);
  const [ready, setReady] = useState("calculate");

  const geoApifyKey = process.env.REACT_APP_GEOAPIFY;

  useEffect(() => {
    setReady(distanceTotal ? "ready" : "calculate");
    if (cost) {
      setReady("calculate");
    }
  }, [distanceTotal, cost]);

  const canCalculate =
    fuelPrice &&
    ((unit === "mpg" && mpg) || (unit === "liters" && liters)) &&
    startLat !== null &&
    startLon !== null &&
    endLat !== null &&
    endLon !== null &&
    distanceTotal;

  function handleCalculate() {
    setIsCalculating(true);
    setShowResults(false);
    setBlobClass("blob");

    setTimeout(() => {
      const usedLiters =
        unit === "mpg"
          ? mpg !== ""
            ? 282.48 / mpg
            : 0
          : liters !== ""
          ? liters
          : 0;

      let totalCost = 0,
        totalLiters = 0,
        nmDistance = 0;
      let cpm = 0,
        nmLiters = 0,
        cmw60 = 0,
        cmw70 = 0,
        cmw80 = 0;

      if (motorwayDistance === 0 && fuelPrice && distanceTotal && usedLiters) {
        const distanceKm = distanceTotal * 1.609344;
        const litersNeeded = (distanceKm * usedLiters) / 100;
        setLitersNeeded(litersNeeded.toFixed(2));
        totalCost = ((fuelPrice / 100) * litersNeeded).toFixed(2);
        setCost(totalCost);
        nmDistance =
          (distanceTotal - motorwayDistance).toFixed(2) || distanceTotal;
        setNonMotorwayDistance(nmDistance);

        const petrolCo2 = 8.9,
          dieselCo2 = 10.2;
        let petrolCo2Calculated = ((distanceTotal / mpg) * petrolCo2).toFixed(
          2
        );
        let dieselCo2Calculated = ((distanceTotal / mpg) * dieselCo2).toFixed(
          2
        );
        setCo2Emissions(
          fuelType === "PETROL" ? petrolCo2Calculated : dieselCo2Calculated
        );

        cpm = (totalCost / distanceTotal).toFixed(2);
        setCostPerMile(cpm);
      }
      if (fuelPrice && distanceTotal && usedLiters && motorwayDistance) {
        const townMPG = liters * 1.25;
        const motorwayMPG = liters * 0.75;
        const mpgAt60 = motorwayMPG;
        const mpgAt70 = motorwayMPG * 1.09;
        const mpgAt80 = motorwayMPG * 1.25;

        const nonMotorwayKm =
          distanceTotal * 1.609344 - motorwayDistance * 1.609344;
        nmDistance = (nonMotorwayKm / 1.609344).toFixed(2);
        setNonMotorwayDistance(nmDistance);

        nmLiters = (nonMotorwayKm * townMPG) / 100;
        setCostNonMotorway((fuelPrice / 100) * nmLiters);

        const motorwayKm = motorwayDistance * 1.609344;
        const litersMotorwayAt60 = (motorwayKm * mpgAt60) / 100;
        const litersMotorwayAt70 = (motorwayKm * mpgAt70) / 100;
        const litersMotorwayAt80 = (motorwayKm * mpgAt80) / 100;

        cmw60 = (fuelPrice / 100) * litersMotorwayAt60;
        cmw70 = (fuelPrice / 100) * litersMotorwayAt70;
        cmw80 = (fuelPrice / 100) * litersMotorwayAt80;

        setCostMotorwayAt60(cmw60);
        setCostMotorwayAt70(cmw70);
        setCostMotorwayAt80(cmw80);

        totalLiters = (litersMotorwayAt70 + nmLiters).toFixed(2);
        setLitersNeeded(totalLiters);
        totalCost = ((fuelPrice / 100) * totalLiters).toFixed(2);
        setCost(totalCost);

        const petrolCo2 = 8.9,
          dieselCo2 = 10.2;
        let petrolCo2Calculated = ((distanceTotal / mpg) * petrolCo2).toFixed(
          2
        );
        let dieselCo2Calculated = ((distanceTotal / mpg) * dieselCo2).toFixed(
          2
        );
        setCo2Emissions(
          fuelType === "PETROL" ? petrolCo2Calculated : dieselCo2Calculated
        );

        cpm = (totalCost / distanceTotal).toFixed(2);
        setCostPerMile(cpm);
      }

      setIsCalculating(false);
      setShowResults(true);
      setBlobClass("blob-hidden");
    }, 900);
    Sentry.captureMessage()("Calculating journey cost", {
      level: "info",
      extra: {
        fuelPrice,
        mpg,
        liters,
        unit,
        startLon,
        startLat,
        endLon,
        endLat,
        motorwayDistance
      }
    });
  }

  function handleReset() {
    setCost(0);
    setFuelPrice("");
    setDistanceTotal(null);
    setLitersNeeded(0);
    setMpg("");
    setLiters("");
    setUnit("mpg");
    setStartLon(null);
    setStartLat(null);
    setEndLon(null);
    setEndLat(null);
    setStartAddress("");
    setEndAddress("");
    setMotorwayDistance(0);
    setBlobClass("blob-hidden");
    setPostcodeKey((prev) => prev + 1);
    setShowResults(false);
    setIsCalculating(false);
    setCo2Emissions(0);
    setCostPerMile(0);
    setCostMotorwayAt60(0);
    setCostMotorwayAt70(0);
    setCostMotorwayAt80(0);
    setCostNonMotorway(0);
    setNonMotorwayDistance(0);
  }

  function handleUnitChange(newUnit) {
    if (unit === newUnit) return;
    if (newUnit === "liters" && mpg !== "") {
      const newLiters = mpg ? (282.48 / mpg).toFixed(2) : "";
      setLiters(newLiters);
    }
    if (newUnit === "mpg" && liters !== "") {
      const newMpg = liters ? (282.48 / liters).toFixed(2) : "";
      setMpg(newMpg);
    }
    setUnit(newUnit);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    if (unit === "mpg") {
      setMpg(value);
      if (value !== "") {
        setLiters((282.48 / value).toFixed(2));
      } else {
        setLiters("");
      }
    } else {
      setLiters(value);
      if (value !== "") {
        setMpg((282.48 / value).toFixed(2));
      } else {
        setMpg("");
      }
    }
  }

  function handleFuelPrice(e) {
    setFuelPrice(e.target.value);
  }

  function onPlaceSelectStart(value) {
    setStartAddress(value.properties.postcode);
    setStartLon(value.properties.lon);
    setStartLat(value.properties.lat);
  }

  function onPlaceSelectEnd(value) {
    setEndAddress(value.properties.postcode);
    setEndLon(value.properties.lon);
    setEndLat(value.properties.lat);
  }

  function handleFuelChange(value) {
    setFuelType(value);
  }

  return (
    <div className="App">
      <div className="App">
        <div className="data-container">
          <Menu onLogin={setUser} user={user} onLogout={() => setUser(null)} />
          <div>
            <h1>Journey Cost Calculator</h1>
            <p className="description">
              Enter your start and end postcodes, fuel price, and your vehicle's
              MPG or L/100km to calculate the cost of your journey.
            </p>
          </div>
          <div className="postcode-inputs">
            <GeoapifyContext apiKey={geoApifyKey}>
              <GeoapifyGeocoderAutocomplete
                placeholder="From"
                placeSelect={onPlaceSelectStart}
                key={`start-${postcodeKey}`}
              />
            </GeoapifyContext>
            <GeoapifyContext apiKey={geoApifyKey}>
              <GeoapifyGeocoderAutocomplete
                placeholder="To"
                placeSelect={onPlaceSelectEnd}
                key={`end-${postcodeKey}`}
              />
            </GeoapifyContext>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className="input-container">
              <div className="floating-label-group">
                <input
                  type="number"
                  value={fuelPrice < 0 ? 0 : fuelPrice}
                  onChange={handleFuelPrice}
                  required
                  min={0}
                />
                <label className="floating-label">
                  Fuel price (pence/litre)
                </label>
              </div>
              <div className="choose">
                <div className="tabs">
                  <input
                    checked={fuelType === "PETROL"}
                    name="fuel-tabs"
                    id="radio-3"
                    type="radio"
                    onChange={() => handleFuelChange("PETROL")}
                  />
                  <label htmlFor="radio-3" className="tab">
                    PETROL
                  </label>
                  <input
                    checked={fuelType === "DIESEL"}
                    name="fuel-tabs"
                    id="radio-4"
                    type="radio"
                    onChange={() => handleFuelChange("DIESEL")}
                  />
                  <label htmlFor="radio-4" className="tab">
                    DIESEL
                  </label>
                  <span className="glider"></span>
                </div>
              </div>
            </div>

            <div className="input-container">
              <div className="floating-label-group">
                <input
                  type="number"
                  value={unit === "mpg" ? mpg : liters}
                  onChange={handleInputChange}
                  required
                  min={0}
                  className={(unit === "mpg" ? mpg : liters) ? "has-value" : ""}
                />
                <label className="floating-label">
                  {unit === "mpg" ? " MPG" : "L/100km"}
                </label>
              </div>
              <div className="choose">
                <div className="tabs">
                  <input
                    checked={unit === "mpg"}
                    name="tabs"
                    id="radio-1"
                    type="radio"
                    onChange={() => handleUnitChange("mpg")}
                  />
                  <label htmlFor="radio-1" className="tab">
                    MPG
                  </label>
                  <input
                    checked={unit === "liters"}
                    name="tabs"
                    id="radio-2"
                    type="radio"
                    onChange={() => handleUnitChange("liters")}
                  />
                  <label htmlFor="radio-2" className="tab">
                    L/100km
                  </label>
                  <span className="glider"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              className={ready}
              onClick={handleCalculate}
              disabled={!canCalculate || isCalculating}
            >
              {!distanceTotal && startLon && startLat && endLon && endLat
                ? "Calculating distance..."
                : "Calculate"}
            </button>
            <button className="reset" onClick={handleReset}>
              Reset
            </button>
          </div>

          <h2 style={{ fontSize: "20px" }}>
            {isCalculating
              ? "Calculating..."
              : showResults
              ? "Results"
              : "Please fill in all fields and click Calculate"}
          </h2>

          <div className="results">
            <div className="card">
              <div className="bg">
                <p>Distance</p>
                <p>
                  <strong>{cost ? `${distanceTotal} mi` : "---"}</strong>
                </p>
                <img src={distanceIco} alt="distance" />
              </div>
              <div className={blobClass}></div>
            </div>

            <div className="card">
              <div className="bg">
                <p>Journey Cost</p>
                <p>
                  <strong>{cost ? `£ ${cost}` : "---"}</strong>
                </p>
                <img src={costIco} alt="cost" />
              </div>
              <div className={blobClass}></div>
            </div>

            <div className="card">
              <div className="bg">
                <p>Fuel Needed</p>
                <p>
                  <strong>{cost ? `${litersNeeded} L` : "---"}</strong>
                </p>
                <img src={gaugeIco} alt="gauge" />
              </div>
              <div className={blobClass}></div>
            </div>
          </div>
        </div>

        <div className="rigth-container">
          <MyMap
            startLat={startLat}
            startLon={startLon}
            endLat={endLat}
            endLon={endLon}
            startAdress={startAdress}
            endAdress={endAdress}
            onMotorwayDistance={setMotorwayDistance}
            distanceTotal={setDistanceTotal}
          />
          <Dashboard
            motorwayDistance={showResults ? motorwayDistance.toFixed(2) : 0}
            co2Emissions={showResults ? co2Emissions : 0}
            costPerMile={costPerMile}
            costMotorwayAt60={costMotorwayAt60}
            costMotorwayAt70={costMotorwayAt70}
            costMotorwayAt80={costMotorwayAt80}
            costNonMotorway={costNonMotorway}
            nonMotorwayDistance={nonMotorwayDistance}
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyCalculator;
