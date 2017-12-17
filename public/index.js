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
                if (trips[i].archived == false) {
                    $('.currTrips').append(`<div class="tripDiv" ><a class="tripName" value="${trips[i]._id}" href="#">${trips[i].trail}</a>
                	<i class="fa fa-trash deleteTrip" aria-hidden="true" value="${trips[i]._id}" title="Delete Trip"></i>
                	<i class="fa fa-share-alt shareImg" aria-hidden="true" value="${trips[i]._id}" title="Share Trip"></i>
                	<i class="fa fa-archive archiveTrip" aria-hidden="true" value="${trips[i]._id}" title="Archive Trip"></i></div>`)
                }
            }
        })
        .fail((err) => {
            console.log(err)
        })
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
        $('.createTripPage').delay(400).fadeIn();
        setTimeout(initMap, 800, lat, lng)

    });
}

function addNewTrip() {
    $('.submitNewTripBtn').on('click', function() {
        console.log(myStorage.userId)
        let tripDetails = {
            userId: myStorage.userId,
            trail: $('.trailName').val(),
            trailheadName: $('.trailheadName').val(),
            startDate: $('.startDate').val(),
            endDate: $('.endDate').val(),
            mapPoints: markers
        }
        console.log(tripDetails)
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
        displayDashboardTrips()
        $('.dashboardPage').delay(600).fadeIn()
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

function apiCallforTripDetailsPage() {
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
                displayTripDetails(data);
                calculatePackWeight(data);
            })
            .fail((err) => {
                console.log(err);
            });
    });
}

function displayTripDetails(data) {
    // $('.currTrips').on('click', '.tripName', function() {
    //     $('.userGearLists').empty();
    //     $('.userFoodLists').empty();
    //     tripIdValue = $(this).attr('value')
    //     console.log(tripIdValue)
    //     $.ajax({
    //             url: `${myURL}trip/id/${tripIdValue}`,
    //             type: 'GET',
    //             headers: { authorization: myStorage.tokenKey }
    //         })
    //         .done((data) => {
    console.log(data)
    let myLat = [];
    let myLng = [];
    $('.dashboardPage').fadeOut();
    $('.tripDetails').delay(500).fadeIn();
    let startDate = moment(data.trip.startDate).utc().format('MMM Do YYYY')
    let endDate = moment(data.trip.endDate).utc().format('MMM Do YYYY')

    $('.tripDetailsDiv').empty().prepend(`<h1>${data.trip.trail}</h1><p>Start Date: <br> ${startDate}</p><style></style><p>End Date: <br>${endDate}</p>`)
    for (let owner in data.orderGearList) {
        //TODO create owner ID for div class     
        let gearContent = `<div><h2 class="listOwner">${owner}</h2><i class="fa fa-angle-right fa-3x showGearList" aria-hidden="true" title="See Gear List"></i><div class="gear-${owner} gearItemDetails">`;
        for (let i = 0; i < data.orderGearList[owner].length; i++) {
            gearContent += `<div class="visibleGearItemDetails"><h3>${data.orderGearList[owner][i].item}</h3><p>Quantity: ${data.orderGearList[owner][i].quantity}</p><p>Weight: ${data.orderGearList[owner][i].weight}</p>
                        <a class="deleteGearItem" value="${data.orderGearList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
        }
        gearContent += `</div></div><hr>`
        $('.userGearLists').append(gearContent);
    }
    for (let owner in data.orderFoodList) {
        let foodContent = `<div><h2 class="listOwner">${owner}</h2><i class="fa fa-angle-right fa-3x showFoodList" aria-hidden="true" title="See Gear List"></i><div class="food-${owner} foodItemDetails">`;
        for (let i = 0; i < data.orderFoodList[owner].length; i++) {
            foodContent += `<div class="visibleFoodItemDetails"><h3>${data.orderFoodList[owner][i].item}</h3><p>Quantity: ${data.orderFoodList[owner][i].quantity}</p><p>Weight: ${data.orderFoodList[owner][i].weight}</p>
                		<a class="deleteFoodItem" value="${data.orderFoodList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
        }
        foodContent += `</div></div><hr>`
        $('.userFoodLists').append(foodContent);
    }
    for (let i = 0; i < data.trip.mapPoints.length; i++) {
        myLat.push(data.trip.mapPoints[i].lat);
        myLng.push(data.trip.mapPoints[i].lng);

    }
    setTimeout(initRouteMap, 800, lat, lng, myLat, myLng);
    // })
    // .fail((err) => {
    //     console.log(err);
    // });
    // });
}



function showAddGearListForm() {
    $('.addGearItem').on('click', function() {
        $('.addGearItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addGearItemForm').toggleClass('hiddenAddGearItemForm visibleGearItemForm');
    });
}

function showAddFoodListForm() {
    $('.addFoodItem').on('click', function() {
        $('.addFoodItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addFoodItemForm').toggleClass('hiddenAddFoodItemForm visibleFoodItemForm')
    })
}

function expandGearList() {
    $('.userGearLists').on('click', '.showGearList', function() {
        $(this).toggleClass('fa fa-angle-right fa fa-angle-down');
        console.log(this)
        let myItems = $(this).siblings('div');
        console.log(myItems)
        myItems.toggleClass('gearItemDetails');
    });
}

function expandFoodList() {
    $('.userFoodLists').on('click', '.showFoodList', function() {
        $(this).toggleClass('fa fa-angle-right fa fa-angle-down');
        console.log(this)
        let myItems = $(this).siblings('div');
        myItems.toggleClass('foodItemDetails');
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
                let className = `gear-${gearItem[0].owner}`;
                if ($('.userGearLists').find(`.${className}`).length == 0) {
                    $('.userGearLists').append(`<div><h2 class="listOwner">${gearItem[0].owner}</h2>
                	<i class="fa fa-angle-down fa-3x showGearList" aria-hidden="true" title="See Gear List"></i><div class="${className}"></div></div><hr>`)
                }
                $(`.${className}`).append(`<div class="visibleGearItemDetails"><h3>${gearItem[0].item}</h3>
                	<p>Quantity: ${gearItem[0].quantity}</p><p>Weight:${gearItem[0].weight}</p>
                	<a class="deleteGearItem" value="${gearItem[0]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`)
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
                let className = `food-${foodItem[0].owner}`;
                if ($('.userFoodLists').find(`.${className}`).length == 0) {
                    $('.userFoodLists').append(`<div><h2 class="listOwner">${foodItem[0].owner}</h2>
                	<i class="fa fa-angle-down fa-3x showFoodList" aria-hidden="true" title="See Food List"></i><div class="${className}"></div></div><hr>`)
                }
                $(`.${className}`).append(`<div class="visibleFoodItemDetails"><h3>${foodItem[0].item}</h3>
	 			<p>Quantity: ${foodItem[0].quantity}</p><p>Weight: ${foodItem[0].weight}</p>
	 			<a class="deleteFoodItem" value="${foodItem[0]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`)
            })
            .fail((err) => {
                console.log(err)
            });
    });
}

function deleteGearItem() {
    $('.userGearLists').on('click', '.deleteGearItem', function() {
        let divToRemove = $(this).parent('div');
        console.log(divToRemove)
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
    $('.userFoodLists').on('click', '.deleteFoodItem', function() {
        console.log(this)
        let divToRemove = $(this).parent('div');
        console.log(divToRemove)
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

createNewTripPageLoad()
addNewTrip()
//displayTripDetails()
apiCallforTripDetailsPage()
addGearItem()
addFoodItem()
expandGearList()
expandFoodList()
showAddGearListForm()
showAddFoodListForm()
deleteGearItem()
deleteFoodItem()
deleteTrip()
toolBarToggle()
backToDashboard()