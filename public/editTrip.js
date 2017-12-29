let myId;

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
			$('.dashboardPage').fadeOut();
			$('.createTripPage').delay(400).fadeIn();
			$('#map').replaceWith('<div id=map3></div>');
			for (let i = 0; i < trip.trip.mapPoints.length; i++) {
				myLat.push(trip.trip.mapPoints[i].lat);
				myLng.push(trip.trip.mapPoints[i].lng);
			}
			setTimeout(initEditRouteMap, 800, myLat, myLng);
			displayTripDetailsToEdit(trip);
		}).fail((err) => {
			console.log(err)
		});
	});
}

function displayTripDetailsToEdit(trip) {
	let startDate = moment(trip.trip.startDate).utc().format('MM/DD/YYYY');
	let endDate = moment(trip.trip.endDate).utc().format('MM/DD/YYYY');
	$('.trailName').val(`${trip.trip.trail}`);
	$('.trailheadName').val(`${trip.trip.trailheadName}`);
	$('.startDate').val(`${startDate}`);
	$('.endDate').val(`${endDate}`);
	$('.submitNewTripBtn').css('display', 'none');
	$('.createTripPage').append(`<button class='submitEditedTripBtn'>Submit Changes</button>`);
	$('.submitEditedTripBtn').css('display', 'block');
}

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
			displayDashboardTrips()
			displayColabTrips()
			$('.createTripPage').fadeOut();
			$('.dashboardPage').delay(400).fadeIn();
			$('#map3').replaceWith('<div id=map></div>');
		}).fail((err) => {
			console.log(err)
		});
	});
}

editTripPageLoad()
submitTripChanges()