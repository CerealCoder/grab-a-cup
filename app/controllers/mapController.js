var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', 'forecastInfo', function($scope, venuesService, forecastInfo) {

    $scope.doAjaxStuff  = function() {

        var city        = $scope.city

        // 1. Get the weather info and extract the coordinates of the desired location
        // 2. Create scope variables for the temperature and city name
        // 3. Return the coordinates and pass them on to the second then call
        // 4. Use the coordinates to make a call to the foursquare API and return a list of 10 coffee shops in a 1.5km radius
        // 5. Loop through the venues and get their latitude and longitude and push the infos into an array
        // 6. Use the coordinates of the city to define the center of the google map
        // 7. Instantiaite the map
        // 7. Loop through the markers array to create a marker for each venue and place it on the map

        forecastInfo.getWeather(city)

            .then(function(response) {

                $scope.cityName         = response.data.name
                $scope.weatherInfo      = response.data.weather[0]
                $scope.temperatureInfo  = response.data.main

                var coords              = response.data.coord
                return coords

            })

            .then(function(coords) {

                var lat = coords.lat
                var lng = coords.lon

                venuesService.getVenues(lat, lng)

                    .then(function(response) {

                        var nearbyCoffeeShops = response.data.response.venues

                        var nearbyCoffeeShopsInfo = $scope.extractCoffeeShopsInfo(nearbyCoffeeShops)

                        $scope.initMap(lat, lng)

                        $scope.createMarkersForCoffeeShops(nearbyCoffeeShopsInfo)

                    })

            })

        $scope.clearForm()

    }

    $scope.clearForm = function() {
        $scope.city = ''
    }

    $scope.initMap = function(lat, lng) {

        var mapSection  = document.getElementById('map')

        var mapStyles = [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "1"
                    },
                    {
                        "gamma": "1.67"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#9acf59"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-3"
                    },
                    {
                        "gamma": "1.60"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "gamma": "0.94"
                    },
                    {
                        "weight": "0.87"
                    },
                    {
                        "lightness": "-4"
                    },
                    {
                        "saturation": "21"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-17"
                    },
                    {
                        "lightness": "15"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-82"
                    },
                    {
                        "lightness": "47"
                    },
                    {
                        "weight": "1.40"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "weight": "1.0"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "color": "#5d4627"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-29"
                    },
                    {
                        "lightness": "32"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "weight": "1.01"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-7"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "27"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-16"
                    },
                    {
                        "lightness": "33"
                    },
                    {
                        "gamma": "1"
                    },
                    {
                        "weight": "1.0"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3f518c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#84afa3"
                    },
                    {
                        "lightness": 52
                    }
                ]
            }
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

        coffeeShopsInfoArray.forEach(function (coffeeShop, index) {

            var markerLatLng    = new google.maps.LatLng(coffeeShop.lat, coffeeShop.lng)
            var iconBase        = "/app/static/img/"


            setTimeout(function() {
                var newMarker       = new google.maps.Marker({

                    position: markerLatLng,
                    map: $scope.map,
                    title: coffeeShop.name,
                    animation: google.maps.Animation.DROP,
                    icon: iconBase + 'location2.svg'
                })
            }, index * 250)

        })
    }

    $scope.extractCoffeeShopsInfo = function(coffeeShopsList) {

        var coffeeShopsInfo = []

        coffeeShopsList.forEach(function(coffeeShop) {

            coffeeShopsInfo.push({

                lat: coffeeShop.location.lat,
                lng: coffeeShop.location.lng,
                name: coffeeShop.name

            })

        })

        return coffeeShopsInfo

    }

}])
