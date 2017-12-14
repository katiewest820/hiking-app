console.log('I\'m working!!')

let myURL = window.location.href.split('#')[0];
let myStorage = window.localStorage;
let tripIdValue;

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
                $('.currTrips').append(`<div class="tripDiv" ><a class="tripName" value="${trips[i]._id}" href="#">${trips[i].trail}</a>
                	<a href="#" class="deleteTrip" value="${trips[i]._id}"><i class="fa fa-trash" aria-hidden="true" title="Delete Trip"></i></a>
                	<a href="#" class="shareImg" value="${trips[i]._id}"><i class="fa fa-share-alt" aria-hidden="true" title="Share Trip"></i></a></div>`)
            }
        })
        .fail((err) => {
            console.log(err)
        })
}

function displayColabTrips() {
    $.ajax({
            url: `${myURL}trip/getByColab/${localStorage.getItem('userId')}`,
            type: 'GET',
            headers: { authorization: myStorage.tokenKey }
        })
        .done((trips) => {
            console.log(trips)
            $('.colabTrips').empty();
            for (let i = 0; i < trips.length; i++) {
                $('.colabTrips').append(`<div class="colabTripDiv"><a value="${trips[i].trip._id}" href="#">${trips[i].trip.trail}</a></div>`)
            }
        })
        .fail((err) => {
            console.log(err)
        });
}

function displayColabTripDetails() {
    $('.colabTrips').on('click', '.colabTripDiv', function() {
        $('.userGearLists').empty();
        $('.tripDetailsDiv').empty();
        
        let myId = $(this).children('a').attr('value')
        console.log(myId)
        tripIdValue = myId;
        $.ajax({
                url: `${myURL}trip/id/${myId}`,
                type: 'GET',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((trip) => {
                console.log(trip)
                $('.dashboardPage').fadeOut();
                $('.tripDetails').delay(500).fadeIn();
                let startDate = moment(trip.startDate).utc().format('MMM Do YYYY')
                let endDate = moment(trip.endDate).utc().format('MMM Do YYYY')
                $('.tripDetailsDiv').empty().prepend(`<h1>${trip.trail}</h1><p>Start Date: <br> ${startDate}</p><style></style><p>End Date: <br>${endDate}</p>`);
                for (let i = 0; i < trip.gearList.length; i++) {
                    $('.userGearLists').append(`<div class="gearItemDetails"><h3>${trip.gearList[i].item}</h3><p>Owner: ${trip.gearList[i].owner}</p><a class="deleteGearItem" value="${trip.gearList[i]._id}" href="#">
					<i class="fa fa-trash" aria-hidden="true"></i></a><p>Quantity: ${trip.gearList[i].quantity}</p><p>Weight: ${trip.gearList[i].weight}</p></div>`);
                }
                for (let i = 0; i < trip.foodList.length; i++) {
                    $('.currFoodList').append(`<div class="foodItemDetails"><h3>${trip.foodList[i].item}</h3><p>Owner: ${trip.foodList[i].owner}</p><a class="deleteFoodItem" value="${trip.foodList[i]._id}" href="#">
					<i class="fa fa-trash" aria-hidden="true"></i></a><p>Quantity: ${trip.foodList[i].quantity}</p><p>Weight: ${trip.foodList[i].weight}</p></div>`);
                }
            })
            .fail((err) => {
                console.log(err)
            });
    });
}



function toolBarToggle() {
    $('.toolbarIcon').on('click', function() {
        $('.toolbarIcon').toggleClass('fa-ellipsis-v fa-ellipsis-h');
        $('.togglerClass').toggleClass('dashboardBtns toggledDashboardBtns');
    });
}

function createNewTripPageLoad() {
    $('.createNewTrip').on('click', function() {
        $('.dashboardPage').fadeOut();
        $('.createTripPage').delay(500).fadeIn();
    });
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

function backToDashboard() {
    $('.backToDashboard').on('click', function() {
        let fadeOutDiv = $(this).parent('section')
        console.log(fadeOutDiv)
        fadeOutDiv.fadeOut();
        $('.dashboardPage').delay(500).fadeIn()
    })
}

function deleteTrip() {
    $('.currTrips').on('click', '.deleteTrip', function(element) {
        let divToRemove = $(this).parent('.tripDiv');
        let myId = element.currentTarget.attributes.value.nodeValue;
        $.ajax({
                url: `${myURL}trip/id/${myId}`,
                type: 'DELETE',
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

function deleteColabTrips() {
    $('.currTrips').on('click', '.deleteTrip', function(element) {
        let myId = element.currentTarget.attributes.value.nodeValue;
        $.ajax({
                url: `${myURL}share/deleteTrip/id/${myId}`,
                type: 'DELETE',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((trip) => {
                console.log(trip)
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
            colabId: $('.colabShare').attr('name'),
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

function shareTripFormLoad() {
    $('.currTrips').on('click', '.shareImg', function() {
        tripIdValue = $(this).attr('value');
        console.log(tripIdValue)
        $('.dashboardPage').fadeOut();
        $('.shareTripPage').delay(500).fadeIn();
    })
}

function findColaborator() {
    $('.colabShare').on('keyup', function() {
        if ($(this).val().length < 3) {
            return
        }
        console.log($(this).val())
        $.ajax({
                url: `${myURL}auth/search/${$(this).val()}`,
                type: 'GET',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((user) => {
                $('.availUsers').html(' ')
                console.log(user)
                user.forEach((currUser) => {
                    $('.availUsers').append(`<option value="${currUser._id}">${currUser.firstName} ${currUser.lastName}</option>`)
                });
            });
    });

}


function selectColaborator() {
    $('.availUsers').on('click', 'option', function(event) {
        console.log(event.currentTarget.firstChild.data)
        $('.colabShare').attr('name', event.target.attributes.value.nodeValue).val(event.currentTarget.firstChild.data)
        $('.availUsers').empty()
    });
}


function displayTripDetails() {
    $('.currTrips').on('click', '.tripName', function() {
        $('.userGearLists').empty();
        $('.userFoodLists').empty();
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
                    console.log('split gear list')
                    console.log(data.orderGearList[owner]);
//TODO create owner ID for div class     
                    let gearContent = `<div class=gear-${owner}><h1>${owner}</h1>`;
                    for (let i = 0; i < data.orderGearList[owner].length; i++) {
                        gearContent += `<div class="gearItemDetails"><h3>${data.orderGearList[owner][i].item}</h3><p>Quantity: ${data.orderGearList[owner][i].quantity}</p><p>Weight: ${data.orderGearList[owner][i].weight}</p>
                        <a class="deleteGearItem" value="${data.orderGearList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                    }
                    gearContent += `</div><hr>`
                    $('.userGearLists').append(gearContent);
                }
                for(let owner in data.orderFoodList){
                	console.log('split food list')
                	console.log(data.orderFoodList[owner])

                	let foodContent = `<div class="food-${owner}"><h1>${owner}</h1>`;
                	for(let i = 0; i < data.orderFoodList[owner].length; i++){
                		foodContent += `<div class="foodItemDetails"><h3>${data.orderFoodList[owner][i].item}</h3><p>Quantity: ${data.orderFoodList[owner][i].quantity}</p><p>Weight: ${data.orderFoodList[owner][i].weight}</p>
                		<a class="deleteFoodItem" value="${data.orderFoodList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                	}
                	foodContent += `</div><hr>`
                	$('.userFoodLists').append(foodContent);
                }
 
            })
            .fail((err) => {
                console.log(err)
            });
    });
}



function expandGearList() {
    $('.expandGearList').on('click', function() {
        let list = $('.gearListDiv').children('div');
        list.toggleClass('currGearListExpanded currGearList');
        icon = $('.gearListDiv').find('i');
        icon.toggleClass('fa fa-chevron-circle-down fa fa-chevron-circle-up');
    });
}

function expandFoodList() {
    $('.expandFoodList').on('click', function() {
        let listTwo = $('.foodListDiv').children('div');
        listTwo.toggleClass('currFoodListExpanded currFoodList');
        iconTwo = $('.foodListDiv').find('i');
        iconTwo.toggleClass('fa fa-chevron-circle-up fa fa-chevron-circle-down');
    });
}

function addGearItem() {
    $('.submitGearItemBtn').on('click', function() {
        let weight = `${$('.newGearItemWeight').val()} ${$('.weightMeasure').val()}`
        console.log(weight)
        let addedGearItem = {
            owner: $('.newGearListOwner').val(),
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
                headers: { authorization: myStorage.tokenKey }
            })
            .done((gearItem) => {
                console.log(gearItem);
                let className = gearItem[0].owner;
                if($('.userGearLists').children(`gear-${className}`) == undefined){
                	console.log('yes')
                }
                //if(className == undefined){
                //	$('.userGearLists').append(`<div class="gear-${className}"><div class="gearItemDetails"><h3>${gearItem[0].item}</h3><a class="deleteGearItem" value="${gearItem[0]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
				//	<p>Quantity: ${gearItem[0].quantity}</p><p>Weight:${gearItem[0].weight}</p></div></div>`)
                //}
                $(`.gear-${className}`).append(`<div class="gearItemDetails"><h3>${gearItem[0].item}</h3><a class="deleteGearItem" value="${gearItem[0]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
				<p>Quantity: ${gearItem[0].quantity}</p><p>Weight:${gearItem[0].weight}</p></div>`)
            })
            .fail((err) => {
                console.log(err)
            })
    });
}

function addFoodItem() {
    $('.submitFoodItemBtn').on('click', function() {
        let weight = `${$('.newFoodItemWeight').val()} ${$('.foodWeightMeasure').val()}`
        console.log(weight)
        let addedFoodItem = {
            owner: $('.newFoodListOwner').val(),
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
                headers: { authorization: myStorage.tokenKey }
            })
            .done((foodItem) => {
                console.log(foodItem);
                let className = foodItem[0].owner;
                console.log(className)
                $(`.food-${className}`).append(`<div class="foodItemDetails"><h3>${foodItem[0].item}</h3><a class="deleteFoodItem" value="${foodItem[0]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
	 			<p>Quantity: ${foodItem[0].quantity}</p><p>Weight: ${foodItem[0].weight}</p></div>`)
            })
            .fail((err) => {
                console.log(err)
            });
    });
}

function deleteGearItem() {
    $('.gearListClick').on('click', 'a', function() {
        let divToRemove = $(this).parent('.gearItemDetails');
        let myId = $(this).attr('value');
        $.ajax({
                url: `${myURL}trip/gearList/id/${tripIdValue}/${myId}`,
                type: 'DELETE',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((gearItem) => {
                console.log(gearItem)
                divToRemove.remove()

            })
            .fail((err) => {
                console.log(err)
            });
    });
}

function deleteFoodItem() {
    $('.foodListClick').on('click', 'a', function() {
        let divToRemove = $(this).parent('.foodItemDetails');
        let myId = $(this).attr('value');
        $.ajax({
                url: `${myURL}trip/foodList/id/${tripIdValue}/${myId}`,
                type: 'DELETE',
                headers: { authorization: myStorage.tokenKey }
            })
            .done((foodItem) => {
                console.log(foodItem)
                divToRemove.remove()
            })
            .fail((err) => {
                console.log(err)
            });
    });
}



shareTrip()
shareTripFormLoad()
createNewTripPageLoad()
addNewTrip()
shareTripFormLoad()
displayTripDetails()
addGearItem()
addFoodItem()
expandGearList()
expandFoodList()
deleteGearItem()
deleteFoodItem()
findColaborator()
selectColaborator()
deleteTrip()
deleteColabTrips()
toolBarToggle()
backToDashboard()
displayColabTripDetails()