var mainFactory = myApp.factory('mainFactory', ['$http', function($http) {

    var usersFactory = {}
    var endpoint = 'http://jsonplaceholder.typicode.com/users'

    usersFactory.getUsers = function() {
        return $http.get(endpoint)
    }

    return usersFactory

}])
