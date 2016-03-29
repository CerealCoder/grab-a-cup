var venuesCtrl = myApp.controller('venuesCtrl', ['$scope', 'venuesService', function($scope, venuesService) {

    $scope.users;

    venuesService.getVenues().then( function(response) {

        console.log(response.data.response.venues)

    }, function (error) {
        console.log('There was an error, the server responsed with a status of ' + resp.status)
    })

}])
