let options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
let markers = [];
let lat;
let lng;

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

    var input = document.getElementById('mapInput');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);

    var marker = new google.maps.Marker({
        position: myPosition,
        map: map
    });
    markers.push(myPosition);
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
    });
}

function initRouteMap(lat, lng, mylat, mylng) {
    console.log('map running')
    let myPosition = { lat: lat, lng: lng }
    let position;

    let map = new google.maps.Map(document.getElementById('map2'), {
        zoom: 8,
        center: myPosition
    });

    for (i = 0; i < mylat.length; i++) {
        position = new google.maps.LatLng({ lat: mylat[i], lng: mylng[i] })



        var marker = new google.maps.Marker({
            position: position,
            map: map
        });
    };
};