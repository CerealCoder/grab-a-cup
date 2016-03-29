var venuesCtrl = myApp.controller('venuesCtrl', ['$scope', 'venuesService', function($scope, venuesService) {

    $scope.users;

    // venuesService.getUsers().then(function(resp) {
    //     $scope.users = resp.data
    // }, function(error) {
    //     $scope.errorMessage = 'There was an error, the server responsed with a status of ' + resp.status
    // })

}])
