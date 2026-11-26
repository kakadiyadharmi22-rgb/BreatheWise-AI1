# BreatheWise AI — Advanced Urban Air Quality Explorer

A browser-based air-quality exploration dashboard built with **HTML, CSS and vanilla JavaScript**. No XAMPP, PHP, database, Node.js or build step is required.

## Run locally
1. Extract the ZIP file.
2. Open the `BreatheWise_AI_Advanced` folder in VS Code.
3. Open `index.html` directly in Chrome or another modern browser.
4. Keep an internet connection active because map tiles, charts, fonts and air-quality data load from public services.

## Features
- City search using Open-Meteo Geocoding.
- Live/modelled air-quality readings: US AQI, PM2.5, PM10, NO2, O3, SO2 and CO.
- Interactive Leaflet map using OpenStreetMap tiles; click a point to request nearby readings.
- Analytics charts using Chart.js.
- Hourly AQI forecast cards.
- Rule-based BreatheWise question-answer assistant that uses the currently loaded data.
- Health-awareness recommendations based on AQI categories.
- Browser notification alerts while the page is open.
- Eco mission progress saved in browser LocalStorage.
- Responsive layout and light/dark theme.

## Data and third-party services
- Air quality and forecast: https://open-meteo.com/
- Geocoding: https://open-meteo.com/en/docs/geocoding-api
- Map tiles: https://www.openstreetmap.org/copyright
- Map library: https://leafletjs.com/
- Charts: https://www.chartjs.org/

Please review the providers' terms, attribution and usage limits before public or large-scale use.

## Important limitations
- Air-quality values are modelled estimates from Open-Meteo, not a certified local monitoring station reading. The selected coordinates and forecast model may not represent street-level exposure.
- The assistant is a rule-based JavaScript helper, **not a generative AI model**. Do not claim Gemini/OpenAI or another GenAI API is integrated in this version.
- Alerts work only while the page is open and browser notification permission is granted. This is not a background push-notification service.
- Health content is general awareness information, not diagnosis or medical advice.
- Some browsers may restrict API requests when opening a local file. If this happens, publish the static folder using GitHub Pages and open the HTTPS site.

## Suggested next steps
1. Test multiple cities and map points.
2. Add screenshots and a short demo recording.
3. Publish this folder as a public GitHub repository.
4. Enable GitHub Pages from repository Settings → Pages.
5. Verify the live link and API calls before submitting the challenge.
