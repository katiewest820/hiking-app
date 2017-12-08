console.log('I\'m working!!')

let myURL = window.location.href.split('#')[0];
let myStorage = window.localStorage;

function checkUserLogin(){
	if(localStorage.getItem('userId')){
		$('.actLoginPage').fadeOut();
			$('.dashboardPage').fadeIn();
			displayDashboardTrips()
	}
}

function logOut(){
	$('.logOut').on('click', function(){
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		$('.dashboardPage').fadeOut();
		$('.actLoginPage').fadeIn();
	});
}

function userLogin(){
	$('.loginBtn').on('click', function(){
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
			if(response == 'you must enter a username and password'){
				console.log('error 1')
				return
			}
			if(response == 'this user does not exist'){
				console.log('error 2')
				return
			}
			if(response == 'password does not match email'){
				console.log('error 3')
				return
			}
			localStorage.setItem('tokenKey', response.token);
			localStorage.setItem('userId', response.userId);
			console.log(myStorage)
			$('.actLoginPage').fadeOut();
			$('.dashboardPage').fadeIn();
			displayDashboardTrips()
		})
		.fail((err) => {
			console.log(err)
		})
	});
}

function displayDashboardTrips(){
	$.ajax({
		url: `${myURL}trip/getByUser/${localStorage.getItem('userId')}`,
		type: 'GET',
		headers: {authorization: myStorage.tokenKey}
	})
	.done((trips) => {
		console.log(trips)
		for(let i = 0; i < trips.length; i++){
			let startDate = moment(trips[i].startDate).utc().format('MMM Do YYYY')
			let endDate = moment(trips[i].endDate).utc().format('MMM Do YYYY')

			$('.currTrips').append(`<div><h1>${trips[i].trail}</h1><p>Start Date: ${startDate}</p><p>End Date: ${endDate}</p>
									<p>Start Location: ${trips[i].startLocation}</p><p>End Location: ${trips[i].endLocation}</p></div>`)
		}
	})
	.fail((err) => {
		console.log(err)
	})
}

function createNewTripPageLoad(){
	$('.createNewTrip').on('click', function(){
		$('.createTripPage').fadeIn()
	})
}

function addNewTrip(){
	$('.submitNewTripBtn').on('click', function(){
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
			headers: {authorization: myStorage.tokenKey}

		})
		.done((trip) => {
			console.log(trip.data.userId)
			console.log(trip)
		})
		.fail((err) => {
			console.log(err)
		});
	});
}


checkUserLogin()
logOut()
userLogin()
createNewTripPageLoad()
addNewTrip()