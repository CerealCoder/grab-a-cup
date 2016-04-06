myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/grab-a-cup/app/views/home.html',
            controller: 'homeCtrl'
        })
        .when('/map', {
            templateUrl : '/grab-a-cup/app/views/map.html',
            controller: 'mapCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}])
