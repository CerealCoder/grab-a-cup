var mainCtrl = myApp.controller('mainCtrl', ['$scope', 'forecastInfo', 'locationInfo', '$location', function ($scope, forecastInfo, locationInfo, $location) {

    // get the value of ng-model
    $scope.setCity   = function() {

        locationInfo.getLatLngFromCity($scope.city)
            .then(function(response) {

                var result          = response.data.results[0]
                var locationData    = result.geometry.location

                var locationName    = result.formatted_address
                var latitude        = locationData.lat
                var longitude       = locationData.lng

                locationInfo.cityName   = locationName
                locationInfo.coords     = {
                    lat: latitude,
                    lng: longitude,
                    LatLng: latitude + ',' + longitude
                }

            }, function (err) {
                console.log(err)
            })

        $location.path('/map')
        $scope.clearForm()
    }

    $scope.clearForm = function() {
        $scope.city = ''
    }

}])
