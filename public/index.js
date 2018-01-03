let myURL = window.location.href.split('#')[0];
let myStorage = window.localStorage;
let tripIdValue;
 let fadeOutSection;

//Get request for current owners trips and displays trips on dashboard
function displayDashboardTrips() {
    $.ajax({
        url: `${myURL}trip/getByUser/${localStorage.getItem('userId')}`,
        type: 'GET',
        headers: {
            authorization: myStorage.tokenKey
        }
    }).done((trips) => {
        $('.helpBtn').fadeIn();
        $('.currTripsDiv').empty();
        //currDashboard template start
        let tripVals = {
            trips: trips
        }
        let templateScript = Handlebars.templates.currDashboard(tripVals);
        $('.currTripsDiv').append(templateScript);
        //currDashboard template end    
    }).fail((err) => {
        console.log(err)
    });
}

//Loads help info page when user info button clicked
function loadHelpPage(){
    $('.helpBtn').on('click', function(){
        fadeOutSection = $(this).siblings('section:visible');
        $(fadeOutSection).css('display', 'none');
        $('.helpBtn').fadeOut();
        $('.helpPage').fadeIn();
    });
}

//Closes help page and reloads section user was previously on
function closeHelpPage(){
    $('.closeHelpWindow').on('click', function(){
        $('.helpPage').css('display', 'none');
        $(fadeOutSection).fadeIn();
        $('.helpBtn').fadeIn();
    });
}

//Toggles instruction sections open and closed
function expandInstructions(){
    $('.expandDiv').on('click', function(){
        let areaToExpand = $(this).siblings('.textToExpand');
        $(this).toggleClass('lit');
        $(areaToExpand).toggleClass('instructions');   
    });
}

//Toggles toolbar open and closed
function toolBarToggle() {
    $('.dashboardPage').on('click', '.toolbarIcon', function() {
        $('.toolbarIcon').toggleClass('fa-ellipsis-v fa-ellipsis-h');
        $('.togglerClass').toggleClass('dashboardBtns toggledDashboardBtns');
    });
}

//Loads create new trip page
function createNewTripPageLoad() {
    $('.dashboardPage').on('click', '.createNewTrip', function() {
        $('.startDate').attr('type', 'text');
        $('.endDate').attr('type', 'text');
        $('.submitEditedTripBtn').remove();
        $('.submitNewTripBtn').css('display', 'block');
        $('.dashboardPage').css('display', 'none');
        $('.createTripPage').fadeIn();
        $('input').val('');
        $('#map3').replaceWith('<div id=map></div>');
        setTimeout(initMap, 500, lat, lng);
    });
}

//Saves newly created trip and returns to dashboard
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
            displayColabTrips();
            displayDashboardTrips();
            $('.createTripPage').css('display', 'none');
            $('.dashboardPage').fadeIn();
        }).fail((err) => {
            console.log(err);
        });
    });
}

//Back to dashboard using back arrow
function backToDashboard() {
    $('body').on('click', '.backToDashboard', function() {
        let fadeOutDiv = $(this).parent('section');
        fadeOutDiv.css('display', 'none');
        displayDashboardTrips();
        displayColabTrips();
        $('.dashboardPage').fadeIn();
    });
}

//Deletes owners trip from dashboard using garbage icon
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
            console.log(err);
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

//Displays trip details
function displayTripDetails(data) {
    let myLat = [];
    let myLng = [];
    $('.dashboardPage').css('display', 'none');
    $('.tripDetails').empty().fadeIn();
    //tripDetails template start
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
    let templateScript = Handlebars.templates.tripDetails(vals);
    $('.tripDetails').append(templateScript);
    //tripDetails template end
    for (let i = 0; i < data.trip.mapPoints.length; i++) {
        myLat.push(data.trip.mapPoints[i].lat);
        myLng.push(data.trip.mapPoints[i].lng);
    }
    $('.mapDistanceTotalsDiv').empty();
    $('#map2').empty().css('height', '500px');
    setTimeout(initRouteMap, 400, myLat, myLng);
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

//Toggles open and closed input form to add new gear item
function showAddGearListForm() {
    $('.tripDetails').on('click', '.addGearItem', function() {
        $('.addGearItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addGearItemForm').toggleClass('hiddenAddGearItemForm visibleGearItemForm');
    });
}

//Toggles open and closed input form to add new food item
function showAddFoodListForm() {
    $('.tripDetails').on('click', '.addFoodItem', function() {
        $('.addFoodItem').toggleClass('fa fa-plus fa fa-minus');
        $('.addFoodItemForm').toggleClass('hiddenAddFoodItemForm visibleFoodItemForm');
    });
}

//Toggles open and closed existing gear list for one person
function expandGearList() {
    $('.tripDetails').on('click', '.showGearList', function() {
        $(this).toggleClass('fa fa-angle-right fa fa-angle-down');
        let myItems = $(this).siblings('div');
        myItems.toggleClass('gearItemDetails');
    });
}

//Toggles open and closed existing gear list for one person
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
                let gearVals = {
                    gearItem: gearItem,
                    className: className
                };
                let templateScript = Handlebars.templates.addNewGearList(gearVals);
                $('.userGearLists').append(templateScript);
            }else{
                let gearItemVals = {
                    gearItem: gearItem
                }
                let templateScript = Handlebars.templates.addNewGearItem(gearItemVals);
                $(`.${className}`).append(templateScript);
            }
            calculatePackWeight();
            $('.addGearItemForm').children('input').val('');
        }).fail((err) => {
            console.log(err);
        });
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
                let foodVals = {
                    foodItem: foodItem,
                    className: className
                };
                let templateScript = Handlebars.templates.addNewFoodList(foodVals);
                $('.userFoodLists').append(templateScript);
            }else{
                let foodItemVals = {
                    foodItem: foodItem
                };
                let templateScript = Handlebars.templates.addNewFoodItem(foodItemVals);
                $(`.${className}`).append(templateScript);
            }
            $('.addFoodItemForm').children('input').val('');
            calculatePackWeight();
        }).fail((err) => {
            console.log(err);
        });
    });
}

function deleteGearItem() {
    $('.tripDetails').on('click', '.deleteGearItem', function(event) {
        event.preventDefault();
        let divToRemove = $(this).parent('div');
        let divCount = $(divToRemove).parent();
        let myId = $(this).attr('value');
        $.ajax({
            url: `${myURL}trip/gearList/id/${tripIdValue}/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((gearItem) => {
            divToRemove.remove();
            if(divCount[0].children.length == 0){
                $(divCount).siblings('.gearListOwner').parent('div').remove();
            }
            calculatePackWeight();
        }).fail((err) => {
            console.log(err);
        });
    });
}

function deleteFoodItem() {
    $('.tripDetails').on('click', '.deleteFoodItem', function(event) {
        event.preventDefault();
        let divToRemove = $(this).parent('div');
        let divCount = $(divToRemove).parent();
        let myId = $(this).attr('value');
        $.ajax({
            url: `${myURL}trip/foodList/id/${tripIdValue}/${myId}`,
            type: 'DELETE',
            headers: {
                authorization: myStorage.tokenKey
            }
        }).done((foodItem) => {
            divToRemove.remove();
            if(divCount[0].children.length == 0){
                $(divCount).siblings('.foodListOwner').parent('div').remove();
            }
            calculatePackWeight();
        }).fail((err) => {
            console.log(err);
        });
    });
}

createNewTripPageLoad()
loadHelpPage()
closeHelpPage()
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

 expandInstructions()