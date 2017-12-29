let myURL = window.location.href.split('#')[0];
let myStorage = window.localStorage;
let tripIdValue;

function displayDashboardTrips() {
    $.ajax({
        url: `${myURL}trip/getByUser/${localStorage.getItem('userId')}`,
        type: 'GET',
        headers: {
            authorization: myStorage.tokenKey
        }
    }).done((trips) => {
        $('.currTripsDiv').empty();
        //currDashboard template start
            let tripVals = {
                trips: trips
            }
            let templateScript = Handlebars.templates.currDashboard(tripVals);
            $('.currTripsDiv').append(templateScript)
        //currDashboard template end    
    }).fail((err) => {
        console.log(err)
    })
}

function toolBarToggle() {
    $('.dashboardPage').on('click', '.toolbarIcon', function() {
        $('.toolbarIcon').toggleClass('fa-ellipsis-v fa-ellipsis-h');
        $('.togglerClass').toggleClass('dashboardBtns toggledDashboardBtns');
    });
}

function createNewTripPageLoad() {
    $('.dashboardPage').on('click', '.createNewTrip', function() {
        $('.submitEditedTripBtn').remove();
        $('.submitNewTripBtn').css('display', 'block');
        $('.dashboardPage').fadeOut();
        $('.createTripPage').delay(400).fadeIn();
        $('#map3').replaceWith('<div id=map></div>');
        setTimeout(initMap, 800, lat, lng);
    });
}

function addNewTrip() {
    $('.submitNewTripBtn').on('click', function() {
        let tripDetails = {
            userId: myStorage.userId,
            trail: $('.trailName').val(),
            trailheadName: $('.trailheadName').val(),
            startDate: $('.startDate').val(),
            endDate: $('.endDate').val(),
            mapPoints: markers
        }
        $.ajax({
            url: `${myURL}trip`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(tripDetails),
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            $('input').val('');
            displayColabTrips();
            displayDashboardTrips();
            $('.createTripPage').fadeOut();
            $('.dashboardPage').delay(500).fadeIn();
        }).fail((err) => {
            console.log(err)
        });
    });
}

function backToDashboard() {
    $('body').on('click', '.backToDashboard', function() {
        let fadeOutDiv = $(this).parent('section');
        fadeOutDiv.fadeOut();
        displayDashboardTrips()
        displayColabTrips()
        $('.dashboardPage').fadeIn();
    });
}

function deleteTrip() {
    $('.dashboardPage').on('click', '.deleteTrip', function(element) {
        let divToRemove = $(this).parent('.tripDiv');
        let myId = element.currentTarget.attributes.value.nodeValue;
        $.ajax({
            url: `${myURL}trip/id/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((trip) => {
            divToRemove.remove();
            displayColabTrips();
        }).fail((err) => {
            console.log(err)
        });
    });
}

function apiCallforTripDetailsPage() {
    $('.dashboardPage').on('click', '.tripName', function(event) {
        event.preventDefault();
        tripIdValue = $(this).attr('value');
        $.ajax({
            url: `${myURL}trip/id/${tripIdValue}`,
            type: 'GET',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((data) => {
            displayTripDetails(data);
            calculatePackWeight();
        }).fail((err) => {
            console.log(err);
        });
    });
}

function displayTripDetails(data) {
    let myLat = [];
    let myLng = [];
    $('.dashboardPage').fadeOut();
    $('.tripDetails').empty().delay(500).fadeIn();
    //tripDetails template start
    let gearData = {};
    let foodData = {};
    for (let owner in data.orderGearList) {
        gearData[owner] = {'gearList': data.orderGearList[owner]} 
    }
    for(let owner in data.orderFoodList){
        foodData[owner] = {'foodList': data.orderFoodList[owner]}
    }
    console.log(gearData)
    console.log(foodData)
    let vals = {
        trailHead: data.trip.trailheadName.split(' ').join('+'),
        trail: data.trip.trail,
        startDate: moment(data.trip.startDate).utc().format('MMM Do YYYY'),
        endDate: moment(data.trip.endDate).utc().format('MMM Do YYYY'),
        gearData: gearData,
        foodData: foodData
    };
    let templateScript = Handlebars.templates.tripDetails(vals);
    $('.tripDetails').append(templateScript)
    //tripDetails template end
    for (let i = 0; i < data.trip.mapPoints.length; i++) {
        myLat.push(data.trip.mapPoints[i].lat);
        myLng.push(data.trip.mapPoints[i].lng);
    }
    $('.mapDistanceTotalsDiv').empty();
    $('#map2').empty().css('height', '500px');
    setTimeout(initRouteMap, 800, myLat, myLng);
}

function exitTripDetailPage() {
    $('.leaveTripPage').on('click', function() {
        if ($('.addGearItemForm').hasClass('visibleGearItemForm') == true) {
            $('.addGearItem').toggleClass('fa fa-plus fa fa-minus');
            $('.addGearItemForm').toggleClass('hiddenAddGearItemForm visibleGearItemForm');
        }
        if ($('.addFoodItemForm').hasClass('visibleFoodItemForm') == true) {
            $('.addFoodItem').toggleClass('fa fa-plus fa fa-minus');
            $('.addFoodItemForm').toggleClass('hiddenAddFoodItemForm visibleFoodItemForm');
        }
    });
}

function showAddGearListForm() {
    $('.tripDetails').on('click', '.addGearItem', function() {
        $('.addGearItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addGearItemForm').toggleClass('hiddenAddGearItemForm visibleGearItemForm');
    });
}

function showAddFoodListForm() {
    $('.tripDetails').on('click', '.addFoodItem', function() {
        $('.addFoodItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addFoodItemForm').toggleClass('hiddenAddFoodItemForm visibleFoodItemForm');
    });
}

function expandGearList() {
    $('.tripDetails').on('click', '.showGearList', function() {
        $(this).toggleClass('fa fa-angle-right fa fa-angle-down');
        let myItems = $(this).siblings('div');
        myItems.toggleClass('gearItemDetails');
    });
}

function expandFoodList() {
    $('.tripDetails').on('click', '.showFoodList', function() {
        $(this).toggleClass('fa fa-angle-right fa fa-angle-down');
        let myItems = $(this).siblings('div');
        myItems.toggleClass('foodItemDetails');
    });
}

function addGearItem() {
    $('.tripDetails').on('click', '.submitGearItemBtn', function() {
        let weight = `${$('.newGearItemWeight').val()} ${$('.weightMeasure').val()}`
        let addedGearItem = {
            owner: $('.newGearListOwner').val().trim().toLowerCase(),
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
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((gearItem) => {
            let className = `gear-${gearItem[0].owner}`;
            if ($('.userGearLists').find(`.${className}`).length == 0) {
                $('.userGearLists').append(`<div><h2 class='gearListOwner' value='${gearItem[0].owner}'>${gearItem[0].owner}</h2>
                <i class='fa fa-angle-down fa-3x showGearList' aria-hidden='true' title='See Gear List'></i><div class='${className}'></div></div><hr>`);
            }
            $(`.${className}`).append(`<div class='visibleGearItemDetails'><h3>${gearItem[0].item}</h3>
                <p>Quantity: ${gearItem[0].quantity}</p><p>Weight:${gearItem[0].weight}</p>
                <a class='deleteGearItem' value='${gearItem[0]._id}' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a></div>`);
            calculatePackWeight()
            $('.addGearItemForm').children('input').val('')
        }).fail((err) => {
            console.log(err)
        })
    });
}

function addFoodItem() {
    $('.tripDetails').on('click', '.submitFoodItemBtn', function() {
        let weight = `${$('.newFoodItemWeight').val()} ${$('.foodWeightMeasure').val()}`;
        let addedFoodItem = {
            owner: $('.newFoodListOwner').val().trim().toLowerCase(),
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
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((foodItem) => {
            let className = `food-${foodItem[0].owner}`;
            if ($('.userFoodLists').find(`.${className}`).length == 0) {
                $('.userFoodLists').append(`<div><h2 class='foodListOwner' value='${foodItem[0].owner}'>${foodItem[0].owner}</h2>
                    <i class='fa fa-angle-down fa-3x showFoodList' aria-hidden='true' title='See Food List'></i><div class='${className}'></div></div><hr>`);
            }
            $(`.${className}`).append(`<div class='visibleFoodItemDetails'><h3>${foodItem[0].item}</h3>
                <p>Quantity: ${foodItem[0].quantity}</p><p>Weight: ${foodItem[0].weight}</p>
                <a class='deleteFoodItem' value='${foodItem[0]._id}' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a></div>`);
            calculatePackWeight()
             $('.addFoodItemForm').children('input').val('')
        }).fail((err) => {
            console.log(err)
        });
    });
}

function deleteGearItem() {
    $('.tripDetails').on('click', '.deleteGearItem', function(event) {
        event.preventDefault();
        let divToRemove = $(this).parent('div');
        console.log(divToRemove)
        let myId = $(this).attr('value');
        $.ajax({
            url: `${myURL}trip/gearList/id/${tripIdValue}/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((gearItem) => {
            divToRemove.remove();
            calculatePackWeight();
        }).fail((err) => {
            console.log(err)
        });
    });
}

function deleteFoodItem() {
    $('.tripDetails').on('click', '.deleteFoodItem', function(event) {
        event.preventDefault();

        let divToRemove = $(this).parent('div');
        console.log(divToRemove)
        let myId = $(this).attr('value');
        $.ajax({
            url: `${myURL}trip/foodList/id/${tripIdValue}/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((foodItem) => {
            divToRemove.remove();
            calculatePackWeight();
        }).fail((err) => {
            console.log(err)
        });
    });
}

createNewTripPageLoad()
addNewTrip()
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
exitTripDetailPage()