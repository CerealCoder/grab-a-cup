var forecastInfo = myApp.service("forecastInfo", ['$http', function($http) {

    var forecastService = {}
    var apiKey = "1e25bef3e01a58bb04db8d19c9ee1a78"
    forecastService.getWeather = function(city) {

        var endpoint = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&" + "APPID=" + apiKey
        return $http.get(endpoint)
    }

    return forecastService

}])
