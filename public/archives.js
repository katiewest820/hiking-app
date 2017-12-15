
console.log('hello')

function changeToArchivedTrue(){
	$('.currTrips').on('click', '.archiveTrip', function(){
		let myId = $(this).attr('value')
		let divToRemove = ($(this).parent('.tripDiv'))
		let updates = {'archived': true};
		$.ajax({
			url: `${myURL}trip/id/${myId}`,
			type: 'PUT',
			contentType: 'application/json',
            data: JSON.stringify(updates),
            headers: { authorization: myStorage.tokenKey }
		})
		.done((trip) => {
			console.log(trip)
			divToRemove.remove()
		})
		.fail((err) => {
			console.log(err)

		});
	});
}

function displayArchivedTrips(){
	$('.seeArchives').on('click', function(){
		$('.archivedTrip').remove();
		$('.dashboardPage').fadeOut();
		$('.archivesPage').delay(400).fadeIn();
	 	$.ajax({
			url: `${myURL}trip/getByUser/${myStorage.userId}`,
	 		type: 'GET',
	 		headers: { authorization: myStorage.tokenKey }
	 	})
	 	.done((trips) => {
	 		console.log(trips)
	 		for(let i = 0; i < trips.length; i++){
	 			if(trips[i].archived == true){
	 				$('.listOfArchivedTrips').append(`<a href="#" class='archivedTrip' value='${trips[i]._id}'>${trips[i].trail}</a>`)
	 			}
	 		}
	 		
	 	})
	 	.fail((err) => {
	 		console.log(err)
	 	})
	})
	
}

function displayArchivedTripDetails() {
    $('.listOfArchivedTrips').on('click', '.archivedTrip', function() {
        $('.userGearLists').empty();
        $('.userFoodLists').empty();
        $('.addFoodItem').css('display', 'none');//todo remove
        $('.addGearItem').css('display', 'none');//todo remove
        $('.archivesPage').fadeOut();
        $('.tripDetails').delay(400).fadeIn();
        tripIdValue = $(this).attr('value')
        console.log(tripIdValue)
        $.ajax({
                url: `${myURL}trip/id/${tripIdValue}`,
                type: 'GET',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((data) => {
                console.log(data)
                $('.dashboardPage').fadeOut();
                $('.tripDetails').delay(500).fadeIn();
                let startDate = moment(data.trip.startDate).utc().format('MMM Do YYYY')
                let endDate = moment(data.trip.endDate).utc().format('MMM Do YYYY')

                $('.tripDetailsDiv').empty().prepend(`<h1>${data.trip.trail}</h1><p>Start Date: <br> ${startDate}</p><style></style><p>End Date: <br>${endDate}</p>`)
                for (let owner in data.orderGearList) {
//TODO create owner ID for div class     
                    let gearContent = `<div><h1 class="listOwner">${owner}</h1><i class="fa fa-angle-right fa-3x showGearList" aria-hidden="true" title="See Gear List"></i><div class="gear-${owner} gearItemDetails">`;
                    for (let i = 0; i < data.orderGearList[owner].length; i++) {
                        gearContent += `<div class="visibleGearItemDetails"><h3>${data.orderGearList[owner][i].item}</h3><p>Quantity: ${data.orderGearList[owner][i].quantity}</p><p>Weight: ${data.orderGearList[owner][i].weight}</p>
                        <a class="deleteGearItem" value="${data.orderGearList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                    }
                    gearContent += `</div></div><hr>`
                    $('.userGearLists').append(gearContent);
                }
                for(let owner in data.orderFoodList){
                	let foodContent = `<div><h1 class="listOwner">${owner}</h1><i class="fa fa-angle-right fa-3x showFoodList" aria-hidden="true" title="See Gear List"></i><div class="food-${owner} foodItemDetails">`;
                	for(let i = 0; i < data.orderFoodList[owner].length; i++){
                		foodContent += `<div class="visibleFoodItemDetails"><h3>${data.orderFoodList[owner][i].item}</h3><p>Quantity: ${data.orderFoodList[owner][i].quantity}</p><p>Weight: ${data.orderFoodList[owner][i].weight}</p>
                		<a class="deleteFoodItem" value="${data.orderFoodList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                	}
                	foodContent += `</div></div><hr>`
                	$('.userFoodLists').append(foodContent);
                }
                $('.leaveTripPage').css('display', 'none');//todo remove
                $('.tripDetails').append(`<i class="fa fa-arrow-left fa-2x backToArchives" aria-hidden="true"></i>`)//todo remove
            })
            .fail((err) => {
                console.log(err)
            });
    });
}

function backtoArchives(){
	$('.tripDetails').on('click', '.backToArchives', function(){
		$('.tripDetails').fadeOut();
		$('.archivesPage').delay(400).fadeIn();
		$('.backToArchives').delay(1000).remove();
	})
}

function cleanupTripDetailsPage(){
	$('.leaveArchives').on('click', function(){
		$('.leaveTripPage').css('display', 'block');
		$('.addGearItem').css('display', 'block');
		$('.addFoodItem').css('display', 'block');
	})
}


changeToArchivedTrue()
displayArchivedTrips()
displayArchivedTripDetails()
backtoArchives()
cleanupTripDetailsPage()