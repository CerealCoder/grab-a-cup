var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', function($scope, venuesService) {

    venuesService.getVenues().then( function(response) {
        console.log(response.data.response.venues)
    }, function (error) {
        console.log('There was an error, the server responsed with a status of ' + resp.status)
    })

    var mapOptions = {
        center: new google.maps.LatLng(50.825022, -0.137915),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var theMap = document.getElementById('map')

    $scope.message = "zeiohfoezhfehz"
    $scope.map     = new google.maps.Map(theMap, mapOptions)

}])
