myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'app/views/home.html',
            controller: 'homeCtrl'
        })
        .when('/map', {
            templateUrl : 'app/views/map.html',
            controller: 'mapCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}])
