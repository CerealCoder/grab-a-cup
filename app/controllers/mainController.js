var mainCtrl = myApp.controller('mainCtrl', ['$scope', 'locationInfo', '$location', 'venuesService', function ($scope, locationInfo, $location, venuesService) {

    // get the value of ng-model
    $scope.getFormInformation   = function() {

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
        $scope.setRadiusAndLimit()
        $scope.clearForm()
        $location.path('/map')
    }

    $scope.setRadiusAndLimit = function() {
        venuesService.searchRadius = $scope.searchRadius
        venuesService.resultsLimit  = $scope.resultsLimit
    }

    $scope.clearForm = function() {
        $scope.city = ''
        $scope.radius = ''
        $scope.limit = ''
    }

}])
