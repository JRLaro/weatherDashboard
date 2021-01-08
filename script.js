$(document).ready(function () {

    // this targets the search button & when clicked runs following...
    $("#searchBtn").on("click", function () {

        // this targets the users search result
        let search = $("#search-input").val();


        $("#search-input").val("")

        //this is going to run the following function 
        weather(search);

        //this is for the search history
        // localStorage.setItem(JSON.stringify(search));

    })
    // this is the specific API key...

    var apiKey = "&appid=cee9b3981135cfc1dc924e1e4e589549"

    //this gets the information from the API
    function weather(search) {

        //current weather
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + apiKey,
            datatype: "json",
            success: function (response) {
                console.log(response);
                //converts K to F
                let tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(0);

                let humid = (response.main.humidity);
                let wind = (response.wind.speed);
                let city = (response.name);
                let country = (response.sys.country);
                let date = moment().format('L');
                let icon = response.weather[0].icon;
                let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                let iconImg = $("<img>");
                iconImg.attr("src", iconUrl);
                let descript = (response.weather[0].description);

                //reflects the information on to the designated area
                $("#temp").text(tempF);
                $("#humid").text(humid);
                $("#wind").text(wind);
                $("#cityName").text(city + ", " + country + " " + "(" + date + ")");
                $("#icon").append(iconImg);
                $("#descript").text(descript);

                //these are the lat & lon of the User
                let lon = (response.coord.lon);
                let lat = (response.coord.lat);
        //UV data
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey,
            datatype: "json",
            success: function (response2) {

                let uv = response2.value;

                $("#uv").removeClass("hidden");
                    
                $("#uv").text(uv);

                $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/forecast?q=" + search + apiKey,
                datatype: "json",
                success: function (response3) {

                     //variables day 1
                    let tempF1 = ((response3.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                    let humid1 = (response3.list[0].main.humidity);
                    let date1 = moment().add(1, 'days').format('L');

                    $("#temp1").text(tempF1)
                    $("#humid1").text(humid1)
                    $("#date1").text(date1)

                    //variables day 2
                    let tempF2 = ((response3.list[7].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                    let humid2 = (response3.list[7].main.humidity);
                    let date2 = moment().add(2, 'days').format('L');

                    $("#temp2").text(tempF2)
                    $("#humid2").text(humid2)
                    $("#date2").text(date2)

                    //variables day 3
                    let tempF3 = ((response3.list[15].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                    let humid3 = (response3.list[15].main.humidity);
                    let date3 = moment().add(3, 'days').format('L');

                    $("#temp3").text(tempF3)
                    $("#humid3").text(humid3)
                    $("#date3").text(date3)

                    //variables day 4
                    let tempF4 = ((response3.list[23].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                    let humid4 = (response3.list[23].main.humidity);
                    let date4 = moment().add(4, 'days').format('L');

                    $("#temp4").text(tempF4)
                    $("#humid4").text(humid4)
                    $("#date4").text(date4)

                    //variables day 5
                    let tempF5 = ((response3.list[31].main.temp - 273.15) * 1.80 + 32).toFixed(0);
                    let humid5 = (response3.list[31].main.humidity);
                    let date5 = moment().add(5, 'days').format('L');

                    $("#temp5").text(tempF5)
                    $("#humid5").text(humid5)
                    $("#date5").text(date5)
                            }
                        })
                    }
                })
                //$("#iconday1").attr("src", iconURL + response3.daily.weather.icon)
            }
        })
    }
    
});