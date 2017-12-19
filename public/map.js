let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
let markers = [];
let lat;
let lng;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay;

navigator.geolocation.getCurrentPosition(
    (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat)
        console.log(lng)
    }, (err) => {
        console.log(err)
    },
    options
);



function initMap(lat, lng) {
    console.log('map running')
    var myPosition = { lat: lat, lng: lng }
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: myPosition
    });
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    $('#map').append(`<input id="mapInput" class="controls" type="text" placeholder="Search Box">`)
    var input = document.getElementById('mapInput');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);

    searchBox.addListener('places_changed', function() {

        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return
            //todo error message
        }
        map.setCenter(new google.maps.LatLng(places[0].geometry.location.lat(), places[0].geometry.location.lng()));
        console.log(places)

    });
    //add click listener
    map.addListener('click', function(e) {
        var marker = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        let myLat = marker.getPosition().lat()
        let myLng = marker.getPosition().lng()
        console.log(myLat)
        console.log(myLng)
        let flag = { lat: myLat, lng: myLng }
        markers.push(flag);
        console.log(markers)
        map.panTo(e.latLng);
        if (markers.length > 1) {
            calcRoute(markers)
        }
        if (markers.length > 2) {
            calcRouteAgain(markers)
        }
    });

}

 function initRouteMap(mylat, mylng) {
    //$('.mapDistanceTotalsDiv').empty();
     console.log('map running')
     //let myPosition = { lat: lat, lng: lng }
     let position;
    
     let map = new google.maps.Map(document.getElementById('map2'), {
         zoom: 8,
         //center: myPosition
     });
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    let markers = []
    for (i = 0; i < mylat.length; i++) {
         position = new google.maps.LatLng({ lat: mylat[i], lng: mylng[i] })
         let setLat = position.lat();
         let setLng = position.lng();
         let flag = { lat: setLat, lng: setLng }
         markers.push(flag);


         var marker = new google.maps.Marker({
             position: position,
             map: map
         });
     };
     console.log(markers)
         if (markers.length > 1) {
             calcRoute(markers)
         }
         if (markers.length > 2) {
             calcRouteAgain(markers)
         }
         if(markers.length == 0){
            $('#map2').html('<h1 class="noMapMsg">No Map Information Available</h1>').css('height', 'fit-content')
         }
};



function calcRoute(markers) {
    console.log(markers)
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
            console.log(result)
        }
    });
}

function calcRouteAgain(markers) {
    var start = markers[0]
    var end = markers[markers.length-1]
    console.log(end)
    let wayPoints = [];
    for (let i = 1; i < markers.length -1; i++) {
        wayPoints.push({location: markers[i], stopover: false}) 
    }
        var request = {
            origin: start,
            destination: end,
            waypoints: wayPoints,
            provideRouteAlternatives: false,
            travelMode: 'WALKING'
        };
        console.log(wayPoints)
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
            let distance = result.routes[0].legs[0].distance.text
            let duration = result.routes[0].legs[0].duration.text
            
            $('.mapDistanceTotalsDiv').html(`<p>Route Distance:${distance}</p><p>Estimated Duration: ${duration}</p>`)
        }
    });

}