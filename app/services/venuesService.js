var venuesService = myApp.service('venuesService', ['$http', function($http) {

    var venuesService = {}

    var latitude = 50.825022
    var longitude = -0.137915

    var queryParams = {
        latlng: latitude + ',' + longitude,
        categoryId: "4bf58dd8d48988d1e0931735",
        limit: 10,
        radius: 1500,
        clientId: "CZ5CAAJEQ2LT5A5VDUCGVJ4TJNHMC50Y01GDZL240AAZIOO4",
        clientSecret: "RYD442GSBXBZOUUWVETX5ZZXJMDELCIUF10C52R4G145JTQL",
        apiVersion: 20160412
    }

    var endpoint = "https://api.foursquare.com/v2/venues/search?ll=" + queryParams.latlng + "&query=coffee&radius=" + queryParams.radius + "&limit=" + queryParams.limit + "&categoryId=" + queryParams.categoryId + "&client_id=" + queryParams.clientId + "&client_secret=" + queryParams.clientSecret + "&v=" + queryParams.apiVersion + "&locale=en"

    venuesService.getVenues = function(lat,lng) {
        return $http.get(endpoint)
    }

    return venuesService

}])
