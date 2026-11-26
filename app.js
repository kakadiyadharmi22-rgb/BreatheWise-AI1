/* BreatheWise AI - data and application state */
window.BW = {city:"Ahmedabad", country:"India", lat:23.0225, lon:72.5714, aqi:null, current:{}, hourly:{}, locationName:"Ahmedabad, India"};
const $ = id => document.getElementById(id);
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function aqiBand(aqi){if(aqi<=50)return {label:"Good",color:"#28a879",advice:"Air quality is satisfactory"};if(aqi<=100)return {label:"Moderate",color:"#b7a83b",advice:"Generally acceptable for most people"};if(aqi<=150)return {label:"Sensitive groups",color:"#d9913e",advice:"Sensitive people should reduce prolonged exertion"};if(aqi<=200)return {label:"Unhealthy",color:"#d66a55",advice:"Consider reducing outdoor exertion"};if(aqi<=300)return {label:"Very unhealthy",color:"#a65c91",advice:"Avoid prolonged outdoor activity"};return {label:"Hazardous",color:"#8b4b52",advice:"Avoid outdoor exposure where possible"}}
function num(v){return v===undefined||v===null||!Number.isFinite(Number(v))?"—":Number(v).toFixed(1)}
function getVal(arr,i){return arr&&arr[i]!==undefined?arr[i]:null}
async function geocode(city){
 const url="https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(city)+"&count=1&language=en&format=json";
 const r=await fetch(url);if(!r.ok)throw new Error("City search failed");const d=await r.json();if(!d.results||!d.results.length)throw new Error("City not found. Try another spelling.");
 return d.results[0];
}
async function loadCity(city,lat,lon,displayName){
 $("dataStatus").textContent="Connecting to live air-quality data…";
 try{
  if(lat===undefined){const place=await geocode(city);lat=place.latitude;lon=place.longitude;BW.city=place.name;BW.country=place.country||"";displayName=place.name+(place.country?", "+place.country:"");}
  BW.lat=lat;BW.lon=lon;BW.locationName=displayName||city;
  const url="https://air-quality-api.open-meteo.com/v1/air-quality?latitude="+lat+"&longitude="+lon+"&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi&forecast_days=3&timezone=auto";
  const r=await fetch(url);if(!r.ok)throw new Error("Air-quality service is unavailable");const data=await r.json();if(!data.hourly||!data.hourly.time)throw new Error("No readings returned for this location");
  BW.hourly=data.hourly;const times=data.hourly.time;let idx=times.findIndex(t=>new Date(t).getTime()>=Date.now()-3600000);if(idx<0)idx=0;
  BW.current={pm25:getVal(data.hourly.pm2_5,idx),pm10:getVal(data.hourly.pm10,idx),co:getVal(data.hourly.carbon_monoxide,idx),no2:getVal(data.hourly.nitrogen_dioxide,idx),so2:getVal(data.hourly.sulphur_dioxide,idx),o3:getVal(data.hourly.ozone,idx)};
  BW.aqi=getVal(data.hourly.us_aqi,idx);if(BW.aqi===null){const next=data.hourly.us_aqi.findIndex(v=>v!==null);BW.aqi=next>=0?data.hourly.us_aqi[next]:0;idx=next>=0?next:idx;}
  renderSnapshot();if(window.updateMapLocation)updateMapLocation(lat,lon,BW.locationName);if(window.renderAnalytics)renderAnalytics();if(window.renderForecast)renderForecast(idx);if(window.updateHealth)updateHealth();if(window.checkAlert)checkAlert();
  $("dataStatus").textContent="Live model data loaded · "+BW.locationName;$("updatedAt").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
 }catch(err){$("dataStatus").textContent=err.message;toast(err.message);console.error(err)}
}
function renderSnapshot(){
 const b=aqiBand(Number(BW.aqi)||0);$("cityHeading").textContent=BW.locationName;$("aqiValue").textContent=Math.round(BW.aqi||0);$("aqiLabel").textContent=b.label;$("aqiLabel").style.background=b.color+"20";$("aqiLabel").style.color=b.color;$("aqiMessage").textContent=b.advice;$("aqiAdviceShort").textContent=b.label;
 $("aqiMarker").style.left=Math.min(96,Math.max(1,(BW.aqi/300)*100))+"%";
 $("pm25").textContent=num(BW.current.pm25);$("pm10").textContent=num(BW.current.pm10);$("no2").textContent=num(BW.current.no2);$("o3").textContent=num(BW.current.o3);$("so2").textContent=num(BW.current.so2);$("co").textContent=num(BW.current.co);
}
$("searchCity").addEventListener("click",()=>{const v=$("cityInput").value.trim();if(v)loadCity(v)});
$("cityInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("searchCity").click()});
$("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");$("themeToggle").innerHTML=document.body.classList.contains("dark")?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';localStorage.setItem("bw-theme",document.body.classList.contains("dark")?"dark":"light")});
if(localStorage.getItem("bw-theme")==="dark"){document.body.classList.add("dark");$("themeToggle").innerHTML='<i class="fa-solid fa-sun"></i>'}
$("menuToggle").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>{$("sidebar").classList.remove("open");document.querySelectorAll(".nav-link").forEach(x=>x.classList.remove("active"));a.classList.add("active")}));
loadCity("Ahmedabad",BW.lat,BW.lon,"Ahmedabad, India");
