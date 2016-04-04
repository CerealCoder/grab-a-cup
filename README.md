# Grab A Cup

Grab A Cup is an Angular 1.x web application that I've built after teaching myself the framework.

I didn't really want to create yet another todo application so I decided to go with something a bit more original.

The concept behind the app is very simple: The user enters their location, and after they've chosen a radius and a number of venues, the application returns a map with a list of nearby coffee shops along with useful weather information.

Behind the scenes, the applications makes use of the Google Maps Geocoding API to return latitude and longitude data from the location the user entered, passes that information on to the open weather map API to get the temperatures.

Then, using those same coordinates, a call to foursquare's API is made to return the list of venues. A map is also instantiated and markers for each venue are placed on the map using the coordinates returned by the foursquare API.

I still have to make it responsive (though the priority for me in this case was to focus on the logic and not the styling)

I will also add Angular JS form validation and a way for the users to use their exact location using the native javascript geolocation API.

If you stumble across this project and want to contribute, please don't hesitate to initiate a PR, I always love to collaborate and learn from more experienced / talented developers to learn new tricks and techniques.

Thanks !

__Credits: Coffee Icon by Jordan Díaz Andrés from the Noun Project__
