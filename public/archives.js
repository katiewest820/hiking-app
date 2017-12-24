function changeToArchivedTrue() {
	$('.currTrips').on('click', '.archiveTrip', function() {
		let myId = $(this).attr('value')
		let divToRemove = ($(this).parent('.tripDiv'))
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
			displayColabTrips()
		}).fail((err) => {
			console.log(err);
		});
	});
};

function displayArchivedTrips() {
	$('.seeArchives').on('click', function() {
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
				if (trips[i].archived == true) {
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
			divToRemove.remove()
		}).fail((err) => {
			console.log(err)
		});
	});
};

function displayArchivedTripDetails() {
	$('.listOfArchivedTrips').on('click', 'a', function() {
		$('.userGearLists').empty();
		$('.userFoodLists').empty();
		$('.addFoodItem').css('display', 'none');
		$('.addGearItem').css('display', 'none');
		$('.archivesPage').fadeOut();
		$('.tripDetails').delay(400).fadeIn();
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
			let startDate = moment(data.trip.startDate).utc().format('MMM Do YYYY')
			let endDate = moment(data.trip.endDate).utc().format('MMM Do YYYY')
			let trailHead = data.trip.trailheadName.split(' ').join('+')
			$('.tripDetailsDiv').empty().prepend(`<a  target='_blank' href='https://www.google.com/maps/search/${trailHead}+trailhead'><h1>${data.trip.trail}</h1></a><p>Start Date: <br> ${startDate}</p><style></style><p>End Date: <br>${endDate}</p>`)
			for (let owner in data.orderGearList) {
				let gearContent = `<div><h1 class='listOwner'>${owner}</h1><i class='fa fa-angle-right fa-3x showGearList' aria-hidden='true' title='See Gear List'></i><div class='gear-${owner} gearItemDetails'>`;
				for (let i = 0; i < data.orderGearList[owner].length; i++) {
					gearContent += `<div class='visibleGearItemDetails'><h3>${data.orderGearList[owner][i].item}</h3><p>Quantity: ${data.orderGearList[owner][i].quantity}</p><p>Weight: ${data.orderGearList[owner][i].weight}</p>
                        <a class='deleteGearItem' value='${data.orderGearList[owner][i]._id}' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a></div>`;
				}
				gearContent += `</div></div><hr>`
				$('.userGearLists').append(gearContent);
			}
			for (let owner in data.orderFoodList) {
				let foodContent = `<div><h1 class='listOwner'>${owner}</h1><i class='fa fa-angle-right fa-3x showFoodList' aria-hidden='true' title='See Gear List'></i><div class='food-${owner} foodItemDetails'>`;
				for (let i = 0; i < data.orderFoodList[owner].length; i++) {
					foodContent += `<div class='visibleFoodItemDetails'><h3>${data.orderFoodList[owner][i].item}</h3><p>Quantity: ${data.orderFoodList[owner][i].quantity}</p><p>Weight: ${data.orderFoodList[owner][i].weight}</p>
                		<a class='deleteFoodItem' value='${data.orderFoodList[owner][i]._id}' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a></div>`;
				}
				foodContent += `</div></div><hr>`
				$('.userFoodLists').append(foodContent);
			}
			$('.leaveTripPage').css('display', 'none'); //todo remove
			$('.tripDetails').append(`<i class='fa fa-arrow-left fa-2x backToArchives' aria-hidden='true'></i>`);
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

function cleanupTripDetailsPage() {
	$('.leaveArchives').on('click', function() {
		$('.leaveTripPage').css('display', 'block');
		$('.addGearItem').css('display', 'block');
		$('.addFoodItem').css('display', 'block');
	});
};

changeToArchivedTrue()
displayArchivedTrips()
deleteArchives()
reactivateArchives()
displayArchivedTripDetails()
backtoArchives()
cleanupTripDetailsPage()