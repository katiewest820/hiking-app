//When archive button selected on dashboard changes archived boolean to false and removes trip from dashboard
function changeToArchived() {
    $('.dashboardPage').on('click', '.archiveTrip', function() {
        let myId = $(this).attr('value');
        let divToRemove = ($(this).parent('.tripDiv'));
        let updates = {
            'archived': false
        };
        $.ajax({
            url: `${myURL}trip/id/${myId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updates),
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            divToRemove.remove();
            displayColabTrips();
        }).fail((err) => {
            console.log(err);
        });
    });
}

//Loads archived page and displays all trips with archived boolean of value false
function displayArchivedTrips() {
    $('.dashboardPage').on('click', '.seeArchives', function() {
        $('.listOfArchivedTrips').empty('a');
        $('.dashboardPage').css('display', 'none');
        $('.archivesPage').fadeIn();
        $.ajax({
            url: `${myURL}trip/getByUser/${myStorage.userId}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trips) => {
            // archivesList templat start
            for (let i = 0; i < trips.length; i++) {
                if (trips[i].archived == false) {
                    let archivedTrip = {
                        trip: trips[i]
                    }
                    let templateScript = Handlebars.templates.archivesList(archivedTrip);
                    $('.listOfArchivedTrips').append(templateScript);
                }
            }
            // archivesList template end
        }).fail((err) => {
            console.log(err);
        });
    });
}

//Deletes archived trip when delete icon clicked
function deleteArchives() {
    $('.listOfArchivedTrips').on('click', '.deleteArchive', function() {
        let myId = $(this).attr('value');
        let divToRemove = $(this).parent('.archivedTripDiv')
        $.ajax({
            url: `${myURL}trip/id/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            divToRemove.remove();
        }).fail((err) => {
            console.log(err);
        });
    });
}

//Changes archived boolean value to true and removes trip from archived page and move it to dashboard 
function reactivateArchives() {
    $('.listOfArchivedTrips').on('click', '.reactivateTrip', function() {
        let myId = $(this).attr('value');
        let divToRemove = $(this).parent('.archivedTripDiv');
        let updates = {
            'archived': true
        };
        $.ajax({
            url: `${myURL}trip/id/${myId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updates),
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            divToRemove.remove();
        }).fail((err) => {
            console.log(err);
        });
    });
}

//Displays trip details without edit functionality
function displayArchivedTripDetails() {
    $('.listOfArchivedTrips').on('click', 'a', function() {
        tripIdValue = $(this).attr('value')
        $.ajax({
            url: `${myURL}trip/id/${tripIdValue}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((data) => {
            let myLat = [];
            let myLng = [];
            $('.archivesPage').css('display', 'none');
            $('.tripDetails').empty().fadeIn();
            //archivedTripDetails template start
            let gearData = {};
            let foodData = {};
            for (let owner in data.orderGearList) {
                gearData[owner] = { 'gearList': data.orderGearList[owner] }
            }
            for (let owner in data.orderFoodList) {
                foodData[owner] = { 'foodList': data.orderFoodList[owner] }
            }
            let vals = {
                trailHead: data.trip.trailheadName.split(' ').join('+'),
                trail: data.trip.trail,
                startDate: moment(data.trip.startDate).utc().format('MMM Do YYYY'),
                endDate: moment(data.trip.endDate).utc().format('MMM Do YYYY'),
                gearData: gearData,
                foodData: foodData
            };
            let templateScript = Handlebars.templates.archivedTripDetails(vals);
            $('.tripDetails').append(templateScript)
            calculatePackWeight()
            //archivedTripDetails template end
            for (let i = 0; i < data.trip.mapPoints.length; i++) {
                myLat.push(data.trip.mapPoints[i].lat);
                myLng.push(data.trip.mapPoints[i].lng);
            };
            $('.mapDistanceTotalsDiv').empty();
            $('#map2').empty().css('height', '500px');
            setTimeout(initRouteMap, 400, myLat, myLng);
        }).fail((err) => {
            console.log(err);
        });
    });
}

//When back arrow is clicked on archived trip details user is sent back to archives page
function backtoArchives() {
    $('.tripDetails').on('click', '.backToArchives', function() {
        $('.tripDetails').css('display', 'none');
        $('.archivesPage').fadeIn();
        $('.backToArchives').delay(100).remove();
    });
}

//When back arrow is clicked on archies page user is sent back to dashboard
function backToDashboardFromArchives() {
    $('.archivesPage').on('click', '.leaveArchives', function() {
        $('.archivesPage').css('display', 'none');
        displayDashboardTrips();
        displayColabTrips();
        $('.dashboardPage').fadeIn();
    });
}

changeToArchived()
displayArchivedTrips()
deleteArchives()
reactivateArchives()
displayArchivedTripDetails()
backtoArchives()
backToDashboardFromArchives()