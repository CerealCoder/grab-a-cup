var locationInfo = myApp.service('locationInfo', ['$http', function($http) {

    var locationService = {}

    locationService.getLatLngFromCity = function(cityName) {

        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ cityName +'&key=AIzaSyAE5RY82oagtBboJyPfz_YKDpayrVRVcdc&language=en')

    }

    locationService.getUserPosition = function() {

        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude
            var lng = position.coords.longitude
            var coords = lat + ',' + lng
            return coords
        })
    }

    return locationService

}])
