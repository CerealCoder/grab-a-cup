var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', 'forecastInfo', function($scope, venuesService, forecastInfo) {

    // get the weather
    // get the coordinates

    forecastInfo.getWeather("London")
        .then(function(response) {
            console.log(response.data)
        }, function(error) {
            console.log(error)
        })

    venuesService.getVenues().then( function(response) {
        $scope.venues = response.data.response.venues
        console.log($scope.venues)
    }, function (error) {
        $scope.errorMsg = 'There was an error, the server responsed with a status of ' + response.status
    })

    // store the venues
    // create the markers
    // style the map

    var mapOptions = {
        center: new google.maps.LatLng(50.825022, -0.137915),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var theMap      = document.getElementById('map')

    $scope.map      = new google.maps.Map(theMap, mapOptions)

}])
