import React, {useState, useEffect} from "react";
// import "./MoreDetailsContainer.css";

export default function MoreDetailsContainer({
    motorwayDistance,
    co2Emissions,
    costPerMile,
    costMotorwayAt60,
    costMotorwayAt70,
    costMotorwayAt80,
    nonMotorwayDistance,
    costNonMotorway
}) {

    const ecoDrivingFacts = [
        "Smooth acceleration improves fuel efficiency by up to 20%.",
        "Driving at 50-60 mph is the most fuel-efficient speed for most cars.",
        "Aggressive driving can reduce fuel efficiency by up to 40%.",
        "Using cruise control helps maintain a steady speed and saves fuel.",
        "Reducing idling can save up to half a gallon of fuel per hour.",
        "Eco-driving can reduce CO₂ emissions by up to 25%.",
        "Every liter of fuel burned produces about 2.3 kg of CO₂.",
        "Proper tire inflation improves fuel efficiency by 3-5% and reduces emissions.",
        "Using higher gears at lower RPMs reduces fuel consumption and emissions.",
        "Avoiding unnecessary weight improves fuel efficiency.",
        "Regular engine maintenance can improve fuel efficiency by up to 10%.",
        "Dirty air filters can reduce fuel efficiency by up to 15%.",
        "Using synthetic oil can improve engine efficiency and reduce fuel consumption.",
        "Aerodynamic drag increases fuel consumption - roof racks can reduce MPG by up to 10%.",
        "Low rolling resistance tires can improve fuel efficiency by up to 5%.",
        "Anticipating traffic flow reduces unnecessary braking and acceleration.",
        "Hybrid & electric vehicles use regenerative braking to recover energy.",
        "Using eco-driving apps helps track fuel efficiency and driving habits.",
        "Car-sharing & ride-sharing reduce overall emissions and fuel consumption.",
        "Switching to electric vehicles eliminates tailpipe emissions entirely."
      ];
      
      const [factIndex, setFactIndex] = useState(0);
      
      
      useEffect(() => {
        const intervalId = setInterval(() => {
          setFactIndex((prevIndex) => (prevIndex + 1) % ecoDrivingFacts.length);
          // console.log(factIndex);
        }, 6000);
       
        return  () => clearInterval(intervalId);
      });

 

   

  return (
    <div className="more-details-container">
    
        <div className="additional-info">
        
            <div className="details">
                <div className="row"><p>Motorway distance:</p><p className="values">{motorwayDistance.toFixed(2)} miles</p></div>
                <div className="row"><p>non-Motorway distance:</p><p className="values">{nonMotorwayDistance} miles</p></div>
                <div className="row"><p>CO₂ emissions:</p><p className="values">{co2Emissions} g/km</p></div>
                <div className="row"><p>Cost per mile:</p><p className="values">£{costPerMile}</p></div>
            </div>
            <p>Consider lower speeds on motorways to save fuel.</p>
            <div className="details">
                
                <div className="row"><p>at 60 mph:</p><p className="values">£{(costMotorwayAt60 + costNonMotorway).toFixed(2)}</p></div>
                <div className="row"><p>at 70 mph:</p><p className="values">£{(costMotorwayAt70 + costNonMotorway).toFixed(2)}</p></div>
                <div className="row"><p>at 80 mph:</p><p className="values">£{(costMotorwayAt80 + costNonMotorway).toFixed(2)}</p></div>
            </div>
    
        </div>
        
        <div className="info">
            <h2>Did you know?</h2>
            <p>{ecoDrivingFacts[factIndex]}</p>
         
            
        </div>
    </div>
  );
}