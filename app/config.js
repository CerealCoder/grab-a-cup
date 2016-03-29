myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/app/views/hello.html',
        })
        .when('/map', {
            templateUrl : '/app/views/map.html',
        })
        .otherwise({
            redirectTo: '/'
        })

   // use the HTML5 History API
   $locationProvider.html5Mode({enabled: true, requireBase: false});

}])
