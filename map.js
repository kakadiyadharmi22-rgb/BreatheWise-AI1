let airMap,cityMarker;
function initAirMap(){
 if(!window.L)return;airMap=L.map("airMap").setView([BW.lat,BW.lon],10);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(airMap);
 cityMarker=L.marker([BW.lat,BW.lon]).addTo(airMap).bindPopup("<b>Ahmedabad</b><br>Loading air-quality readings").openPopup();
 airMap.on("click",async e=>{const {lat,lng}=e.latlng;const marker=L.marker([lat,lng]).addTo(airMap).bindPopup("Loading nearby air-quality data…").openPopup();try{const url=`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=us_aqi,pm2_5&forecast_days=1&timezone=auto`;const r=await fetch(url);const d=await r.json();const a=d.hourly&&d.hourly.us_aqi?d.hourly.us_aqi.find(v=>v!==null):null;const p=d.hourly&&d.hourly.pm2_5?d.hourly.pm2_5.find(v=>v!==null):null;marker.setPopupContent(`<b>Selected map point</b><br>US AQI: ${a===null||a===undefined?"Unavailable":Math.round(a)}<br>PM2.5: ${p===null||p===undefined?"Unavailable":p.toFixed(1)+" μg/m³"}`).openPopup()}catch(err){marker.setPopupContent("Could not load readings for this point.").openPopup()}});
}
function updateMapLocation(lat,lon,name){if(!airMap)return;airMap.setView([lat,lon],10);if(cityMarker)airMap.removeLayer(cityMarker);cityMarker=L.marker([lat,lon]).addTo(airMap).bindPopup("<b>"+name+"</b><br>US AQI: "+Math.round(BW.aqi||0)).openPopup()}
document.addEventListener("DOMContentLoaded",initAirMap);
