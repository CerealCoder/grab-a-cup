var mapCtrl = myApp.controller('mapCtrl', ['$scope', 'venuesService', 'forecastInfo', function($scope, venuesService, forecastInfo) {

    $scope.doAjaxStuff  = function() {

        var city        = $scope.city

        forecastInfo.getWeather(city)

            .then(function(response) {

                console.log(response.data)

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

                        var venuesInfo = []

                        $scope.venues = response.data.response.venues

                        $scope.venues.forEach(function(venue, index) {

                            setTimeout(function() {

                                venuesInfo.push({

                                    lat: venue.location.lat,
                                    lng: venue.location.lng,
                                    name: venue.name

                                })

                            }, index * 200)

                        })

                        var mapOptions  = {
                            center: new google.maps.LatLng(lat, lng),
                            zoom: 15,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }

                        var mapSection  = document.getElementById('map')

                        $scope.map      = new google.maps.Map(mapSection, mapOptions)

                        venuesInfo.forEach(function (venue) {

                            var markerLatLng    = new google.maps.LatLng(venue.lat, venue.lng)

                            var newMarker       = new google.maps.Marker({

                                position: markerLatLng,
                                map: $scope.map,
                                title: marker.name
                            })

                        })

                    })

            })

        $scope.clearForm()

    }

    $scope.clearForm = function() {
        $scope.city = ''
    }

}])
