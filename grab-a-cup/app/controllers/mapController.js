var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', 'forecastInfo', 'locationInfo', '$location' function($scope, venuesService, forecastInfo, locationInfo, $location) {

    if (!locationInfo.coords) {
        $location.path('/')
    }

    var latitude        = locationInfo.coords.lat
    var longitude       = locationInfo.coords.lng
    var searchRadius    = venuesService.searchRadius
    var resultsLimit    = venuesService.resultsLimit

    forecastInfo.getWeather(latitude, longitude)

        .then(function(response) {
            $scope.temperatureInfo     = response.data.main
            $scope.weatherDescription  = response.data.weather[0].description
            $scope.cityName            = response.data.name
        })

        .then(function() {

            venuesService.getVenues(latitude, longitude, searchRadius, resultsLimit)

                .then(function(response) {

                    var nearbyCoffeeShops = response.data.response.venues

                    var nearbyCoffeeShopsInfo = $scope.extractCoffeeShopsInfo(nearbyCoffeeShops)

                    $scope.venueName  = nearbyCoffeeShopsInfo.name
                    $scope.address    = nearbyCoffeeShopsInfo.address
                    $scope.postcode   = nearbyCoffeeShopsInfo.postcode
                    $scope.phone      = nearbyCoffeeShopsInfo.phone
                    $scope.twitter    = nearbyCoffeeShopsInfo.twitter

                    $scope.initMap(latitude, longitude)

                    $scope.createMarkersForCoffeeShops(nearbyCoffeeShopsInfo)

                })
        })

    $scope.initMap = function(lat, lng) {

        var mapSection  = document.getElementById('map')

        var mapStyles = [
            {"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}
        ]

        var mapOptions  = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 15,
            styles: mapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
            zoomControl: false
        }

        $scope.map      = new google.maps.Map(mapSection, mapOptions)

    }

    $scope.createMarkersForCoffeeShops = function functionName(coffeeShopsInfoArray) {

        var infoWindow = null

        coffeeShopsInfoArray.forEach(function (coffeeShop, index) {

            var markerLatLng    = new google.maps.LatLng(coffeeShop.lat, coffeeShop.lng)
            var marker       = new google.maps.Marker({

                position: markerLatLng,
                map: $scope.map,
                title: coffeeShop.name,
                animation: google.maps.Animation.DROP,
                icon: '/grab-a-cup/app/static/img/location2.svg'

            })

            marker.addListener('click', function() {

                if (infoWindow) {
                    infoWindow.close()
                }

                infoWindow = new google.maps.InfoWindow()

                infoWindow.setContent(

                    "<div class='venue-info'>" +

                        "<div class='venue-info__name'>" +
                            "<h1>" + coffeeShop.name + "</h1>" +
                        "</div>" +

                        "<address class='venue-info__location'>" +

                            "<ul>" +
                                "<li> Address: " + coffeeShop.address  + "</li>" +
                                "<li> Postcode: " + coffeeShop.postcode + "</li>" +
                                "<li> Phone: " + coffeeShop.phone    + "</li>" +
                                "<li> Twitter: " + coffeeShop.twitter  + "</li>" +
                            "</ul>" +

                        "</address>" +


                    "</div>"
                )

                infoWindow.open($scope.map, marker)
                $scope.map.setCenter(infoWindow.getPosition())
            })

        })
    }

    $scope.extractCoffeeShopsInfo = function(coffeeShopsList) {

        var coffeeShopsInfo = []

        coffeeShopsList.forEach(function(coffeeShop) {

            coffeeShopsInfo.push({

                lat: coffeeShop.location.lat,
                lng: coffeeShop.location.lng,
                name: coffeeShop.name,
                phone: coffeeShop.contact.formattedPhone,
                twitter: coffeeShop.contact.twitter,
                postcode: coffeeShop.location.postalCode,
                address: coffeeShop.location.address

            })

        })

        return coffeeShopsInfo

    }

}])
