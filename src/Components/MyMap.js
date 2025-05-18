
import React, { useEffect, useRef } from 'react';
import L  from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MyMap({ startLat = 0, startLon = 0, endLat = 0, endLon = 0, startAdress, endAdress, onMotorwayDistance, distanceTotal}) { 
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  

  useEffect(() => {
    
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    
    const map = L.map(mapContainer.current).setView([startLat || 51.5, startLon || -0.2], 10);
    mapInstance.current = map;

    const myAPIKey = process.env.REACT_APP_GEOAPIFY;
    const isRetina = L.Browser.retina;
    const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
      maxZoom: 20,
      id: 'osm-bright',
    }).addTo(map);

    if (startLat && startLon && endLat && endLon) {
      const fromWaypoint = [startLat, startLon];
      L.marker(fromWaypoint).addTo(map).bindPopup(startAdress).openPopup();


      const toWaypoint = [endLat, endLon];
      L.marker(toWaypoint).addTo(map).bindPopup(endAdress)

      fetch(`https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=route_details&units=imperial&apiKey=${myAPIKey}`)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          let motorwayDistanceMiles = 0;
          const relevantRoadClasses = ["motorway", "trunk"];
          
          result.features.forEach(feature => {
            feature.properties.legs.forEach(leg => {
              leg.steps.forEach(step => {
                const roadClass = step.road_class;
                if (relevantRoadClasses.includes(roadClass) && step.lane_count > 1) {
                  motorwayDistanceMiles += step.distance;
                }
              });
            });
          });
          
          console.log(`Motorway/Highway distance: ${motorwayDistanceMiles.toFixed(2)} miles`);
          
          if (typeof onMotorwayDistance === "function") {
            onMotorwayDistance(motorwayDistanceMiles); // <-- send the value to parent
          }
          
          if (typeof distanceTotal === "function") {
            distanceTotal(result.features[0].properties.distance.toFixed(2)); // <-- send the value to parent   }
          }

          
            L.geoJSON(result, {
              style: (feature) => ({
                color: "rgba(20, 137, 255, 0.7)",
                weight: 5
              })
            }).bindPopup((layer) => {
              const { distance, distance_units, time } = layer.feature.properties;
  
           
  
              console.log(distance, distance_units, time);
              return `${distance.toFixed(2)} ${distance_units}`;
              
            }).addTo(map);
          
        

          map.fitBounds(L.geoJSON(result).getBounds(), { padding: [17, 17] });
        })
        .catch(error => console.error(error));
    }

   
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [startLat, startLon, endLat, endLon, startAdress, endAdress, onMotorwayDistance, distanceTotal]);

  return (
    <div className="map-container"  ref={mapContainer}></div>
  );
}

export default MyMap;
