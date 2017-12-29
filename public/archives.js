function changeToArchived() {
    $('.dashboardPage').on('click', '.archiveTrip', function() {
        let myId = $(this).attr('value')
        let divToRemove = ($(this).parent('.tripDiv'))
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
            displayColabTrips()
        }).fail((err) => {
            console.log(err);
        });
    });
};

function displayArchivedTrips() {
    $('.dashboardPage').on('click', '.seeArchives', function() {
        $('.listOfArchivedTrips').empty('a');
        $('.dashboardPage').fadeOut();
        $('.archivesPage').delay(400).fadeIn();
        $.ajax({
            url: `${myURL}trip/getByUser/${myStorage.userId}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trips) => {
            for (let i = 0; i < trips.length; i++) {
                if (trips[i].archived == false) {
                    $('.listOfArchivedTrips').append(`<div class='archivedTripDiv'><a href='#' value='${trips[i]._id}'>${trips[i].trail}</a>
	 					<i class='fa fa-trash deleteArchive' value='${trips[i]._id}' aria-hidden='true' title='Delete Trip'></i><i class='fa fa-check-circle-o reactivateTrip' value='${trips[i]._id}' aria-hidden='true' title='Reactivate Trip'></i><div>`)
                }
            }
        }).fail((err) => {
            console.log(err)
        });
    });
};

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
            console.log(err)
        });
    });
};

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
            divToRemove.remove()
        }).fail((err) => {
            console.log(err)
        });
    });
};

function displayArchivedTripDetails() {
    $('.listOfArchivedTrips').on('click', 'a', function() {
        $('.archivesPage').fadeOut();
        $('.tripDetails').empty().delay(400).fadeIn();
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
            $('.dashboardPage').fadeOut();
            $('.tripDetails').delay(500).fadeIn();
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
            //archivedTripDetails template end
            for (let i = 0; i < data.trip.mapPoints.length; i++) {
                myLat.push(data.trip.mapPoints[i].lat);
                myLng.push(data.trip.mapPoints[i].lng);
            };
            $('.mapDistanceTotalsDiv').empty();
            $('#map2').empty().css('height', '500px');
            setTimeout(initRouteMap, 800, myLat, myLng);
        }).fail((err) => {
            console.log(err)
        });
    });
};

function backtoArchives() {
    $('.tripDetails').on('click', '.backToArchives', function() {
        $('.tripDetails').fadeOut();
        $('.archivesPage').delay(400).fadeIn();
        $('.backToArchives').delay(1000).remove();
    });
};

function backToDashboardFromArchives() {
	$('.archivesPage').on('click', '.leaveArchives', function() {
        $('.archivesPage').fadeOut();
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