var mapCtrl = myApp.controller('mapCtrl', ['$scope', function($scope) {

    var mapOptions = {
        center: new google.maps.LatLng(50.825022, -0.137915),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var mapElement = document.getElementById('map')

    $scope.message = "zeiohfoezhfehz"
    $scope.map     = new google.maps.Map(mapElement, mapOptions)


}])
