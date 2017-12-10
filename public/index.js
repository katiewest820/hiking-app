console.log('I\'m working!!')

let myURL = window.location.href.split('#')[0];
let myStorage = window.localStorage;
let tripIdValue;

function checkUserLogin() {
    if (localStorage.getItem('userId')) {
        $('.actLoginPage').fadeOut();
        $('.dashboardPage').fadeIn();
        displayDashboardTrips();
        displayColabTrips();
    }
}

function logOut() {
    $('.logOut').on('click', function() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        $('.dashboardPage').fadeOut();
        $('.actLoginPage').fadeIn();
    });
}

function userLogin() {
    $('.loginBtn').on('click', function() {
        let userLoginInfo = {
            email: $('.emailLogin').val(),
            password: $('.passwordLogin').val()
        }
        $.ajax({
                url: `${myURL}auth/login`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(userLoginInfo)
            })
            .done((response) => {
                console.log(response)
                if (response == 'you must enter a username and password') {
                    console.log('error 1')
                    return
                }
                if (response == 'this user does not exist') {
                    console.log('error 2')
                    return
                }
                if (response == 'password does not match email') {
                    console.log('error 3')
                    return
                }
                localStorage.setItem('tokenKey', response.token);
                localStorage.setItem('userId', response.userId);
                console.log(myStorage)
                $('.actLoginPage').fadeOut();
                $('.dashboardPage').fadeIn();
                displayColabTrips();
                displayDashboardTrips();
                
            })
            .fail((err) => {
                console.log(err)
            })
    });
}

function displayDashboardTrips() {
    $.ajax({
            url: `${myURL}trip/getByUser/${localStorage.getItem('userId')}`,
            type: 'GET',
            headers: { authorization: myStorage.tokenKey }
        })
        .done((trips) => {
            console.log(trips)
            $('.currTrips').empty();
            for (let i = 0; i < trips.length; i++) {
                //let startDate = moment(trips[i].startDate).utc().format('MMM Do YYYY')
                //let endDate = moment(trips[i].endDate).utc().format('MMM Do YYYY')
                $('.currTrips').append(`<div class="tripDiv" ><a class="tripName" value="${trips[i]._id}" href="#">${trips[i].trail}</a><a href="#" class="shareImg" value="${trips[i]._id}"><i class="fa fa-share" aria-hidden="true"></i></a></div>`)
            }
        })
        .fail((err) => {
            console.log(err)
        })
}

function displayColabTrips(){
	//console.log('hello 1')
	$.ajax({
		url: `${myURL}trip/getByColab/${localStorage.getItem('userId')}`,
		type: 'GET',
		headers: { authorization: myStorage.tokenKey }
	})
	.done((trips) => {
		console.log(trips)
		//console.log('hello 2')
		$('.colabTrips').empty();
		for (let i = 0; i < trips.length; i++) {
			$('.colabTrips').append(`<div><a href="#">${trips[i].trip.trail}</a></div>`)
		}
	})
	.fail((err) => {
		console.log(err)
	});
}


function createNewTripPageLoad() {
    $('.createNewTrip').on('click', function() {
    	$('.dashboardPage').fadeOut();
        $('.createTripPage').delay(500).fadeIn();
    })
}

function addNewTrip() {
    $('.submitNewTripBtn').on('click', function() {
        console.log(myStorage.userId)
        let tripDetails = {
            userId: myStorage.userId,
            trail: $('.trailName').val(),
            startLocation: $('.startLocation').val(),
            endLocation: $('.endLocation').val(),
            startDate: $('.startDate').val(),
            endDate: $('.endDate').val()
        }

        $.ajax({
                url: `${myURL}trip`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(tripDetails),
                headers: { authorization: myStorage.tokenKey }

            })
            .done((trip) => {
                console.log(trip.data.userId)
                console.log(trip)
                displayColabTrips();
            	displayDashboardTrips();
            	$('.createTripPage').fadeOut();
                $('.dashboardPage').delay(500).fadeIn();
            })
            .fail((err) => {
                console.log(err)
            });
    });
}

function shareTrip() {
    $('.shareTripBtn').on('click', function() {
        let shareTripId = {
            tripId: tripIdValue,
            ownerId: localStorage.getItem('userId'),
            colabId: $('.colabShare').val(),
            admin: $('.adminShare').is(":checked")
        }
		console.log(shareTripId)
		$.ajax({
			url: `${myURL}share/shareTrip`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(shareTripId),
			headers: { authorization: myStorage.tokenKey }
		})
		.done((share) => {
			console.log(share)
			displayColabTrips();
            displayDashboardTrips();
			$('.shareTripPage').fadeOut();
			$('.dashboardPage').delay(500).fadeIn();
		})
		.fail((err) => {
			console.log(err)
		});
    });
}

function shareTripFormLoad(){
	$('.currTrips').on('click', '.shareImg', function(){
		tripIdValue = $(this).attr('value');
		console.log(tripIdValue)
		$('.dashboardPage').fadeOut();
		$('.shareTripPage').delay(500).fadeIn();
	})	
}

function displayTripDetails(){
	$('.currTrips').on('click', '.tripName', function(){
		tripIdValue = $(this).attr('value')
		console.log(tripIdValue)
		$.ajax({
			url: `${myURL}trip/id/${tripIdValue}`,
			type: 'GET',
			headers: { authorization: myStorage.tokenKey }
		})
		.done((trip) => {
			console.log(trip)
			$('.dashboardPage').fadeOut();
			$('.tripDetails').delay(500).fadeIn();
			let startDate = moment(trip.startDate).utc().format('MMM Do YYYY')
            let endDate = moment(trip.endDate).utc().format('MMM Do YYYY')
			$('.tripDetailsDiv').prepend(`<h1>${trip.trail}</h1><p>${startDate}</p><p>${endDate}</p>`)
			for(let i = 0; i < trip.gearList.length; i++){
				$('.currGearList').append(`<div class="gearItemDetails"><h3>${trip.gearList[i].item}</h3><p>Quantity: ${trip.gearList[i].quantity}</p><p>Weight: ${trip.gearList[i].weight}</p></div>`)
			}
			for(let i = 0; i < trip.foodList.length; i++){
				$('.currFoodList').append(`<div class="foodItemDetails"><h3>${trip.foodList[i].item}</h3><p>Quantity: ${trip.foodList[i].quantity}</p><p>Weight: ${trip.foodList[i].weight}</p></div>`)
			}

		})
		.fail((err) => {
			console.log(err)
		});
	});
}

function expandGearList(){
	$('.expandGearList').on('click', function(){
		let list = $('.gearListDiv').children('div');
		list.toggleClass('currGearListExpanded currGearList');
		//$('.currGearListExpanded').toggleClass('currGearList')
		icon = $('.gearListDiv').find('i');
		icon.toggleClass('fa fa-chevron-circle-down fa fa-chevron-circle-up')
	});
}

function expandFoodList(){
	$('.expandFoodList').on('click', function(){
		let listTwo = $('.foodListDiv').children('div');
		listTwo.toggleClass('currFoodListExpanded currFoodList');
		iconTwo = $('.foodListDiv').find('i');
		iconTwo.toggleClass('fa fa-chevron-circle-up fa fa-chevron-circle-down')
		//$('.fa-chevron-circle-down').toggleClass('.fa-chevron-circle-up expandGearList')
		//$('.currGearList').addClass('animated slideInDown')
		//$('.currGearList').toggleClass('.currGearListExpanded')
		
	})
}

function addGearItem(){
	$('.submitGearItemBtn').on('click', function(){
		let weight = `${$('.newGearItemWeight').val()} ${$('.weightMeasure').val()}`
		console.log(weight) 
		let addedGearItem = {
			item: $('.newGearItem').val(),
			weight: weight,
			quantity: $('.newGearItemQ').val()
		}
		console.log(addedGearItem)

		$.ajax({
			url: `${myURL}trip/gearList/id/${tripIdValue}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(addedGearItem),
			headers: {authorization: myStorage.tokenKey}
		})
		.done((gearItem) => {
			console.log(gearItem)
			$('.currGearList').prepend(`<div class="gearItemDetails"><h3>${gearItem[0].item}</h3><p>Quantity: ${gearItem[0].quantity}</p><p>Weight: ${gearItem[0].weight}</p></div>`)
		})
		.fail((err)=> {
			console.log(err)
		})
	});
}

function addFoodItem(){
	$('.submitFoodItemBtn').on('click', function(){
		let weight = `${$('.newFoodItemWeight').val()} ${$('.foodWeightMeasure').val()}`
		console.log(weight) 
		let addedFoodItem = {
	 		item: $('.newFoodItem').val(),
	 		weight: weight,
	 		quantity: $('.newFoodItemQ').val()
	 	}
	 	console.log(addedFoodItem)

	 	$.ajax({
	 		url: `${myURL}trip/foodList/id/${tripIdValue}`,
	 		type: 'POST',
	 		contentType: 'application/json',
	 		data: JSON.stringify(addedFoodItem),
	 		headers: {authorization: myStorage.tokenKey}
	 	})
	 	.done((foodItem) => {
	 		console.log(foodItem)
			
	 		$('.currFoodList').prepend(`<div class="foodItemDetails"><h3>${foodItem[0].item}</h3><p>Quantity: ${foodItem[0].quantity}</p><p>Weight: ${foodItem[0].weight}</p></div>`)
	 	})
	 	.fail((err)=> {
	 		console.log(err)
	 	})
	 });
}

function deleteGearItem(){

}



shareTrip()
shareTripFormLoad()
checkUserLogin()
logOut()
userLogin()
createNewTripPageLoad()
addNewTrip()
shareTripFormLoad()
displayTripDetails()
addGearItem()
addFoodItem()

expandGearList()
expandFoodList()