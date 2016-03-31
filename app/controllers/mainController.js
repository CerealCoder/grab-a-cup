var mainCtrl = myApp.controller('mainCtrl', ['$scope', 'forecastInfo', '$location', function ($scope, forecastInfo, $location) {

    // get the value of ng-model
    $scope.setCity = function() {
        forecastInfo.city = $scope.city
        $location.path('/map')

        $scope.clearForm()
    }

    $scope.clearForm = function() {
        $scope.city = ''
    }

}])
