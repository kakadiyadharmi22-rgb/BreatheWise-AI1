let aqiChartObj,pollutantChartObj;
function renderAnalytics(){
 if(!window.Chart||!BW.hourly.time)return;const h=BW.hourly;const times=h.time.slice(0,24);const labels=times.map(t=>new Date(t).toLocaleTimeString([],{hour:"numeric"}));const vals=(h.us_aqi||[]).slice(0,24);
 const common={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:"#899ba0",font:{size:9},maxTicksLimit:8}},y:{grid:{color:"rgba(130,150,155,.13)"},ticks:{color:"#899ba0",font:{size:9}}}}};
 if(aqiChartObj)aqiChartObj.destroy();aqiChartObj=new Chart(document.getElementById("aqiChart"),{type:"line",data:{labels,datasets:[{data:vals,label:"US AQI",borderColor:"#0d9b8b",backgroundColor:"rgba(13,155,139,.12)",fill:true,tension:.35,pointRadius:2,pointBackgroundColor:"#0d9b8b"}]},options:common});
 const names=["PM2.5","PM10","NO₂","O₃","SO₂","CO"];const values=[BW.current.pm25,BW.current.pm10,BW.current.no2,BW.current.o3,BW.current.so2,BW.current.co].map(v=>Number(v)||0);
 if(pollutantChartObj)pollutantChartObj.destroy();pollutantChartObj=new Chart(document.getElementById("pollutantChart"),{type:"bar",data:{labels:names,datasets:[{data:values,backgroundColor:["#16a995","#5d9bd3","#e8a14b","#9173c4","#df6b69","#c4ae43"],borderRadius:5,maxBarThickness:24}]},options:{...common,scales:{...common.scales,x:{...common.scales.x,ticks:{...common.scales.x.ticks,maxRotation:0}},y:{...common.scales.y,beginAtZero:true}}}});
}
