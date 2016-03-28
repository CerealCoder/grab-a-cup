var mainCtrl = myApp.controller('mainCtrl', ['$scope', 'mainFactory', function($scope, mainFactory) {

    $scope.users;


    mainFactory.getUsers().then(function(resp) {
        $scope.users = resp.data
    }, function(error) {
        $scope.errorMessage = 'There was an error, the server responsed with a status of ' + resp.status    
    })

}])


// Retrieve all the users
// mainFactory.getUsers()
//     .then(function(response) {
//         $scope.users = response.data
//     }, function functionName(error) {
//         $scope.errorMessage = "There was an error, the server responded with a " + error.status + "error."
//     })
//
// console.log($scope.users)
