let myId;

//Get request for trip details when edit icon is selected
function editTripPageLoad() {
	$('.dashboardPage').on('click', '.editTrip', function() {
		let myLat = [];
		let myLng = [];
		$('.submitEditedTripBtn').remove();
		myId = $(this).attr('value');
		$.ajax({
			url: `${myURL}trip/id/${myId}`,
			type: 'GET',
			headers: {
				authorization: myStorage.tokenKey
			}
		}).done((trip) => {
			$('.dashboardPage').css('display', 'none');
			$('.createTripPage').fadeIn();
			$('#map').replaceWith('<div id=map3></div>');
			for (let i = 0; i < trip.trip.mapPoints.length; i++) {
				myLat.push(trip.trip.mapPoints[i].lat);
				myLng.push(trip.trip.mapPoints[i].lng);
			}
			setTimeout(initEditRouteMap, 400, myLat, myLng);
			displayTripDetailsToEdit(trip);
		}).fail((err) => {
			console.log(err);
		});
	});
}

//Displays trip details in create trip page form inputs so that user can edit
function displayTripDetailsToEdit(trip) {
	startDate = moment(trip.trip.startDate).utc().format('MM/DD/YYYY');
	endDate = moment(trip.trip.endDate).utc().format('MM/DD/YYYY');
	console.log(startDate)
	console.log(endDate)
	$('.trailName').val(`${trip.trip.trail}`);
	$('.trailheadName').val(`${trip.trip.trailheadName}`);
	$('.startDate').val(`${startDate}`);
	$('.endDate').val(`${endDate}`);
	$('.submitNewTripBtn').css('display', 'none');
	$('.createTripPage').append(`<button class='submitEditedTripBtn'>Submit Changes</button>`);
	$('.submitEditedTripBtn').css('display', 'block');
}

//Put request to update edited trip details
function submitTripChanges() {
	$('.createTripPage').on('click', '.submitEditedTripBtn', function() {
		let edits = {
			trail: $('.trailName').val(),
			trailheadName: $('.trailheadName').val(),
			startDate: $('.startDate').val(),
			endDate: $('.endDate').val(),
			mapPoints: markers
		}
		$.ajax({
			url: `${myURL}trip/id/${myId}`,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(edits),
			headers: {
				authorization: myStorage.tokenKey
			}
		}).done((trip) => {
			$('input').val('');
			displayDashboardTrips();
			displayColabTrips();
			$('.createTripPage').css('display', 'none');
			$('.dashboardPage').fadeIn();
			$('#map3').replaceWith('<div id=map></div>');
		}).fail((err) => {
			console.log(err);
		});
	});
}

editTripPageLoad()
submitTripChanges()