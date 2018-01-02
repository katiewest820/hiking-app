let markers = [];
let wayPoints = [];
let lat;
let lng;
let directionsService = new google.maps.DirectionsService();
let directionsDisplay;

//Gets current location (lat/lng) of user
let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
navigator.geolocation.getCurrentPosition(
    (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
    }, (err) => {
        console.log(err)
    }, options);

//Loads create trip page map that allows user to create a route and save route
function initMap(lat, lng) {
    markers = [];
    let myPosition = {
        lat: lat,
        lng: lng
    }
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myPosition
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    $('#map').append(`<input id='mapInput' class='controls' type='text' placeholder='Search Box'><button class='clearRouteBtn'>Clear Map</button>`);
    let input = document.getElementById('mapInput');
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
    searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();
        if (places.length == 0) {
            return
        }
        map.setCenter(new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng()));
    });
    map.addListener('click', function(e) {
        let marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        let myLat = marker.getPosition().lat();
        let myLng = marker.getPosition().lng();
        let flag = {lat: myLat, lng: myLng};
        markers.push(flag);
        map.panTo(e.latLng);
        if (markers.length > 1) {
            calcRoute(markers)
        }
        if (markers.length > 2) {
            calcRouteAgain(markers)
        }
    });
}

//Loads trip details page map that displays previously create map route without edit functionality 
function initRouteMap(mylat, mylng) {
    if(mylat == 0 && mylng == 0){
        $('#map2').html('<h1 class="noMapMsg">No Map Information Available</h1>').css('height', 'fit-content');
        return
    }
    let position;
    let map = new google.maps.Map(document.getElementById('map2'), {
        zoom: 12,
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    markers = [];
    for (i = 0; i < mylat.length; i++) {
        position = new google.maps.LatLng({lat: mylat[i], lng: mylng[i]});
        let setLat = position.lat();
        let setLng = position.lng();
        let flag = {lat: setLat, lng: setLng};
        markers.push(flag);
        let marker = new google.maps.Marker({
            position: position,
            map: map
        });
    };
    if (markers.length == 1) {
        calcRoute(markers)
    }
    calcRouteAgain(markers)
};

//Loads edit trip page map that allows user to add markers to an existing route 
function initEditRouteMap(mylat, mylng) {
    let position;
    let map = new google.maps.Map(document.getElementById('map3'), {
        zoom: 12,
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    $('#map3').append(`<input id='mapEditInput' class='controls' type='text' placeholder='Search Box'><button class='clearRouteBtn'>Clear Map</button>`);
    let input = document.getElementById('mapEditInput');
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
    searchBox.addListener('places_changed', function() {
        let places = searchBox.getPlaces();
        if (places.length == 0) {
            return
        }
        map.setCenter(new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng()));
    });
    markers = [];
    for (i = 0; i < mylat.length; i++) {
        position = new google.maps.LatLng({lat: mylat[i], lng: mylng[i]});
        let setLat = position.lat();
        let setLng = position.lng();
        let flag = {lat: setLat, lng: setLng};
        markers.push(flag);
        let marker = new google.maps.Marker({
            position: position,
            map: map
        });
    };
    map.addListener('click', function(e) {
        let newMarker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        let myLat = newMarker.getPosition().lat();
        let myLng = newMarker.getPosition().lng();
        let newFlag = {lat: myLat, lng: myLng};
        markers.push(newFlag);
        map.panTo(e.latLng);
        calcRouteAgain(markers)
    });
    if (markers.length == 0) {
        $('#map3').html('<h1 class="noMapMsg">No Map Information Available</h1>').css('height', 'fit-content');
        return
    }
    calcRouteAgain(markers)
};

//Calculates route with 2 markers
function calcRoute(markers) {
    let start = markers[0];
    let end = markers[1];
    let request = {
        origin: start,
        destination: end,
        provideRouteAlternatives: false,
        travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}

//Calculates route with 3 + markers
function calcRouteAgain(markers) {
    let start = markers[0];
    let end = markers[markers.length - 1];
    wayPoints = [];
    for (let i = 1; i < markers.length - 1; i++) {
        wayPoints.push({
            location: markers[i],
            stopover: false
        });
    }
    let request = {
        origin: start,
        destination: end,
        waypoints: wayPoints,
        provideRouteAlternatives: false,
        travelMode: 'WALKING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            let distance = result.routes[0].legs[0].distance.text;
            let duration = result.routes[0].legs[0].duration.text;
            $('.mapDistanceTotalsDiv').html(`<p>Route Distance:${distance}</p><p>Estimated Duration: ${duration}</p>`);
        }
    });
}

//If user clears edit map, map is switched to create route map 
function clearMapRoute() {
    $('.createTripPage').on('click', '.clearRouteBtn', function() {
        $('#map3').replaceWith('<div id=map></div>');
        markers.length = 0;
        wayPoints.length = 0;
        setTimeout(initMap, 300, lat, lng);
    });
}

clearMapRoute()