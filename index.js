    var Today = $("#today")
    var forecast = $("#forecast")
    var searchField = $("#search-input")
    var searchButton = $("#search-button")
    var historyArea = $(".list-group")
    var newDiv = $("<div>");
    newDiv.addClass("")
    var Container = $(".form-inline")
    Container.append(newDiv);
    var lon = 0;
    var lat = 0;
    var apiKey = "11c698b900bcca165ef3054ac3254c35";
    var storedCity = []
    var city;

searchButton.on("click", function(e){
    e.preventDefault()
    
    city = searchField.val()
    
    console.log(city)

    ShowWeatherForecast(city)
})

historyArea.on("click", function(e){

    e.preventDefault()

    city = $(e.target).val()

    ShowWeatherForecast(city)

    console.log(city)
})

function ShowWeatherForecast(city){

    var apiURL2 = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=1&appid="+ apiKey;

    $.ajax({
        url: apiURL2,
        method: "GET"

    }).then(function(result){

        console.log(result)

        if(JSON.parse(localStorage.getItem("city"))){

            storedCity = JSON.parse(localStorage.getItem("city")) || [];

            storedCity.push(result[0].name)

            console.log(storedCity)

            localStorage.setItem("city", JSON.stringify(storedCity))
            
        }
        
        else{

            storedCity.push(result[0].name)

            console.log(storedCity)

            localStorage.setItem("city", JSON.stringify(storedCity))

        }
            
        lat = result[0].lat;
        lon = result[0].lon

        var apiURL ="https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(function (result) {
        
            console.log(result.list)
            var todayDiv = $("<div>").addClass("col-md-2 m-2 bg")
            var todaydate = moment(result[0].dt_txt).format("DD MM YYYY")
            var name = result.name + todaydate


        })
    })

}
