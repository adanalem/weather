const API_key = "a2ab7fc929a110ae354da74357af35fd";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function get_weather(city) {
    try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
        let response = await fetch(URL);

        
        
        if (!response.ok) {
            alert("City not found!");
            return;
        }

        let data = await response.json();
        console.log(data);
        
        // UI Update Logic
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";

        // Dynamic Icon Logic
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weatherIcon").src = iconUrl;
        
    } catch (error) {
        console.error('Network Error:', error);
    }
}

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value;
    if(cityName !== "") {
        get_weather(cityName); 
    }
    
});

// "Enter" key se bhi search chalay ga
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }




    
});

