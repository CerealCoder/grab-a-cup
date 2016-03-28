myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/app/views/hello.html',
            controller : 'mainCtrl'
        })


   // use the HTML5 History API
   $locationProvider.html5Mode({enabled: true, requireBase: false});


}])
