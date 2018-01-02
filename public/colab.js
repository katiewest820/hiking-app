//Get request for current shared trips and displays trips on dashboard
function displayColabTrips() {
    $.ajax({
        url: `${myURL}trip/getByColab/${localStorage.getItem('userId')}`,
        type: 'GET',
        headers: {
            authorization: myStorage.tokenKey
        }
    }).done((trips) => {
        $('.sharedTripsDiv').empty();
        //sharedDashboard template start
        let colabTripVals = {
            colabTrips: trips
        }
        let templateScript = Handlebars.templates.sharedDashboard(colabTripVals);
        $('.sharedTripsDiv').append(templateScript)
        //sharedDashboard template end 
    }).fail((err) => {
        console.log(err)
    });
}

//Displays trip details of collaborated trip
function displayColabTripDetails() {
    $('.dashboardPage').on('click', '.colabTripDiv', function(event) {
        event.preventDefault()
        let myLat = [];
        let myLng = [];
        $('.userGearLists').empty();
        $('.userFoodLists').empty();
        $('.tripDetailsDiv').empty();
        let myId = $(this).children('a').attr('value')
        tripIdValue = myId;
        $.ajax({
            url: `${myURL}trip/id/${myId}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((data) => {
            $('.dashboardPage').fadeOut();
            $('.tripDetails').empty().delay(500).fadeIn();
            //tripDetails template start
            let gearData = {};
            let foodData = {};
            for (let owner in data.orderGearList) {
                gearData[owner] = {'gearList': data.orderGearList[owner]} 
            }
            for(let owner in data.orderFoodList){
                foodData[owner] = {'foodList': data.orderFoodList[owner]}
            }
            console.log(gearData)
            console.log(foodData)
            let vals = {
                trailHead: data.trip.trailheadName.split(' ').join('+'),
                trail: data.trip.trail,
                startDate: moment(data.trip.startDate).utc().format('MMM Do YYYY'),
                endDate: moment(data.trip.endDate).utc().format('MMM Do YYYY'),
                gearData: gearData,
                foodData: foodData
            };
            let templateScript = Handlebars.templates.tripDetails(vals);
            $('.tripDetails').append(templateScript)
            //tripDetails template end
             calculatePackWeight()
             for (let i = 0; i < data.trip.mapPoints.length; i++) {
                 myLat.push(data.trip.mapPoints[i].lat);
                 myLng.push(data.trip.mapPoints[i].lng);
             }
             $('.mapDistanceTotalsDiv').empty();
             $('#map2').empty().css('height', '500px')
             setTimeout(initRouteMap, 800, myLat, myLng);
        }).fail((err) => {
            console.log(err)
        });
    });
}

//Deletes shared trip if trip was deleted by owner
function deleteColabTrips() {
    $('.currTrips').on('click', '.deleteTrip', function(element) {
        let myId = element.currentTarget.attributes.value.nodeValue;
        $.ajax({
            url: `${myURL}share/deleteTrip/id/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            console.log(trip)
        }).fail((err) => {
            console.log(err)
        });
    });
}

//From share screen shares trip with selected user and returns to dashboard 
function shareTrip() {
    $('.shareTripBtn').on('click', function() {
        let shareTripId = {
            tripId: tripIdValue,
            ownerId: localStorage.getItem('userId'),
            colabId: $('.colabShare').attr('name')
        }
        $.ajax({
            url: `${myURL}share/shareTrip`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(shareTripId),
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((share) => {
            displayColabTrips();
            displayDashboardTrips();
            $('.shareTripPage').fadeOut();
            $('.dashboardPage').delay(500).fadeIn();
        }).fail((err) => {
            console.log(err)
        });
    });
}

//If share icon is clicked on dashboard share screen is loaded
function shareTripFormLoad() {
    $('.dashboardPage').on('click', '.shareImg', function() {
        $('.colabShare').val('');
        $('.availUsers').empty();
        tripIdValue = $(this).attr('value');
        $('.dashboardPage').fadeOut();
        $('.shareTripPage').delay(700).fadeIn().css('display', 'grid');
    });
}

//Searches for registered users by name and populates dropdown with full name
function findColaborator() {
    $('.colabShare').on('keyup', function() {
        if ($(this).val().length < 3) {
            return
        }
        $.ajax({
            url: `${myURL}auth/search/${$(this).val()}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((user) => {
            $('.availUsers').html(' ');
            user.forEach((currUser) => {
                $('.availUsers').append(`<option value='${currUser._id}'>${currUser.firstName} ${currUser.lastName}</option>`);
            });
        });
    });
}

//Selects collaborator and clears dropdown
function selectColaborator() {
    $('.availUsers').on('click', 'option', function(event) {
        $('.colabShare').attr('name', event.target.attributes.value.nodeValue).val(event.currentTarget.firstChild.data);
        $('.availUsers').empty();
    });
}

displayColabTripDetails()
shareTrip()
deleteColabTrips()
shareTripFormLoad()
findColaborator()
selectColaborator()