var mainCtrl = myApp.controller('mainCtrl', ['$scope', 'forecastInfo', '$location', '$http',function ($scope, forecastInfo, $location, $http) {

    // get the value of ng-model
    $scope.setCity   = function() {
        forecastInfo.city = $scope.city
        $location.path('/map')

        $scope.clearForm()
    }

    $scope.clearForm = function() {
        $scope.city = ''
    }

    $scope.getCoords = function(position) {

        var lat = position.coords.latitude
        var lng = position.coords.longitude
        var coords = lat + ',' + lng
        console.log(coords)
    }

    $scope.getPos    = function() {

        navigator.geolocation.getCurrentPosition($scope.getCoords)

    }

    $scope.geoCode   = function() {

        var city = $scope.city

        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ city +'&key=AIzaSyAE5RY82oagtBboJyPfz_YKDpayrVRVcdc&language=en').then(function(response) {
            console.log(response.data)
        }, function(error) {
            console.log(error)
        })
    }

}])
