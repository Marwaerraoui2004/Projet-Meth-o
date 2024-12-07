$(document).ready(function() {
    $("#cities").change(function() {
        let coords = $(this).val().split(",");
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

        const selectedCity = $(this).find("option:selected").text();
        let cityImage = '';
        let bodyImage = '';
        
        switch(selectedCity) {
            case 'Paris':
                cityImage = '/icons/paris.jpg';
                bodyImage = '/icons/paris.jpg';
                break;
            case 'Shanghai':
                cityImage = '/icons/shangai.jpg';
                bodyImage = '/icons/shangai.jpg';
                break;
            case 'New York':
                cityImage = '/icons/newyork.jpg';
                bodyImage = '/icons/newyork.jpg';
                break;
            case 'Casablanca':
                cityImage = '/icons/casablanca.jpg';
                bodyImage = '/icons/casablanca.jpg';
                break;
            case 'Agadir':
                cityImage = '/icons/agadir.jpg';
                bodyImage = '/icons/agadir.jpg';
                break;    
            default:
                cityImage = '/image.jpg';
                bodyImage = '/image.jpg';
        }

        
        $("body").css("visibility", "hidden");

        $("#background-image").css("background-image", `url(${cityImage})`);
        $("#image").css("background-image", `url(${bodyImage})`);

        setTimeout(function() {
            $("body").css({
                "background-image": `url(${bodyImage})`,
                "visibility": "visible"
            });
        }, 50); 

        $.get(url, function(data) {
            $("#temp").html(data.current_weather.temperature + " °C");

            const isDay = data.current_weather.is_day;
            const rain = data.current_weather.rain;
            if (rain > 0) {
                $("#icon").attr("src", "/icons/rain.svg");
            } else if (isDay) {
                $("#icon").attr("src", "/icons/sun.svg");
            } else {
                $("#icon").attr("src", "/icons/moon.svg");
            }

            let forecastHtml = '';
            data.daily.time.forEach((day, index) => {
                forecastHtml += `
                    <div class="forecast-day">
                        <p>${new Date(day).toLocaleDateString()}</p>
                        <p>Max: ${data.daily.temperature_2m_max[index]}°C</p>
                        <p>Min: ${data.daily.temperature_2m_min[index]}°C</p>
                    </div>`;
            });
            $("#forecast").html(forecastHtml);
        });
    });

    $("#cities").trigger("change");
});
