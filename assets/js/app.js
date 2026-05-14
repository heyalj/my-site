(function () {
    var card = document.getElementById('weather-card');
    var iconEl = document.getElementById('weather-icon');
    var tempEl = document.getElementById('weather-temp');
    var descEl = document.getElementById('weather-desc');

    var codeMap = {
        0:  { emoji: '☀️',  desc: 'Clear sky' },
        1:  { emoji: '🌤️', desc: 'Mainly clear' },
        2:  { emoji: '⛅',  desc: 'Partly cloudy' },
        3:  { emoji: '☁️',  desc: 'Overcast' },
        45: { emoji: '🌫️', desc: 'Fog' },
        48: { emoji: '🌫️', desc: 'Freezing fog' },
        51: { emoji: '🌦️', desc: 'Light drizzle' },
        53: { emoji: '🌦️', desc: 'Drizzle' },
        55: { emoji: '🌧️', desc: 'Heavy drizzle' },
        56: { emoji: '🌧️', desc: 'Freezing drizzle' },
        57: { emoji: '🌧️', desc: 'Freezing drizzle' },
        61: { emoji: '🌧️', desc: 'Light rain' },
        63: { emoji: '🌧️', desc: 'Rain' },
        65: { emoji: '🌧️', desc: 'Heavy rain' },
        66: { emoji: '🌧️', desc: 'Freezing rain' },
        67: { emoji: '🌧️', desc: 'Freezing rain' },
        71: { emoji: '🌨️', desc: 'Light snow' },
        73: { emoji: '🌨️', desc: 'Snow' },
        75: { emoji: '🌨️', desc: 'Heavy snow' },
        77: { emoji: '❄️',  desc: 'Snow grains' },
        80: { emoji: '🌦️', desc: 'Rain showers' },
        81: { emoji: '🌧️', desc: 'Rain showers' },
        82: { emoji: '🌧️', desc: 'Heavy showers' },
        85: { emoji: '🌨️', desc: 'Snow showers' },
        86: { emoji: '🌨️', desc: 'Heavy snow showers' },
        95: { emoji: '⛈️',  desc: 'Thunderstorm' },
        96: { emoji: '⛈️',  desc: 'Thunderstorm w/ hail' },
        99: { emoji: '⛈️',  desc: 'Thunderstorm w/ hail' }
    };

    function showMuted(icon, message) {
        card.classList.add('weather-card--muted');
        iconEl.textContent = icon;
        tempEl.textContent = '';
        descEl.textContent = message;
    }

    function fetchWeather(lat, lon) {
        var url = 'https://api.open-meteo.com/v1/forecast'
            + '?latitude=' + lat
            + '&longitude=' + lon
            + '&current=temperature_2m,weather_code'
            + '&temperature_unit=fahrenheit';
        fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var t = Math.round(data.current.temperature_2m);
                var code = data.current.weather_code;
                var info = codeMap[code] || { emoji: '🌡️', desc: 'Weather' };
                iconEl.textContent = info.emoji;
                tempEl.textContent = t + '°F';
                descEl.textContent = info.desc;
            })
            .catch(function () {
                showMuted('⚠️', 'Weather unavailable right now');
            });
    }

    if (!navigator.geolocation) {
        showMuted('📍', 'Enable location to see your weather');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (pos) { fetchWeather(pos.coords.latitude, pos.coords.longitude); },
        function () { showMuted('📍', 'Enable location to see your weather'); },
        { timeout: 10000 }
    );
})();
