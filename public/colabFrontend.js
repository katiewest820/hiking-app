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
        let myLat = [];
        let myLng = [];
        $('.userGearLists').empty();
        $('.userFoodLists').empty();
        $('.tripDetailsDiv').empty();
        
        let myId = $(this).children('a').attr('value')
        console.log(myId)
        tripIdValue = myId;
        $.ajax({
                url: `${myURL}trip/id/${myId}`,
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
                    let gearContent = `<div><h2 class="gearListOwner" value='${owner}'>${owner}</h2><i class="fa fa-angle-right fa-3x showGearList" aria-hidden="true" title="See Gear List"></i><div class="gear-${owner} gearItemDetails">`;
                    for (let i = 0; i < data.orderGearList[owner].length; i++) {
                        gearContent += `<div class="visibleGearItemDetails"><h3>${data.orderGearList[owner][i].item}</h3><p>Quantity: ${data.orderGearList[owner][i].quantity}</p><p>Weight: ${data.orderGearList[owner][i].weight}</p>
                        <a class="deleteGearItem" value="${data.orderGearList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                    }
                    gearContent += `</div></div><hr>`
                    $('.userGearLists').append(gearContent);
                }
                for(let owner in data.orderFoodList){
                    let foodContent = `<div><h2 class="foodListOwner" value='${owner}'>${owner}</h2><i class="fa fa-angle-right fa-3x showFoodList" aria-hidden="true" title="See Gear List"></i><div class="food-${owner} foodItemDetails">`;
                    for(let i = 0; i < data.orderFoodList[owner].length; i++){
                        foodContent += `<div class="visibleFoodItemDetails"><h3>${data.orderFoodList[owner][i].item}</h3><p>Quantity: ${data.orderFoodList[owner][i].quantity}</p><p>Weight: ${data.orderFoodList[owner][i].weight}</p>
                        <a class="deleteFoodItem" value="${data.orderFoodList[owner][i]._id}" href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></div>`;
                    }
                    foodContent += `</div></div><hr>`
                    $('.userFoodLists').append(foodContent);
                }
                calculatePackWeight()
                for (let i = 0; i < data.trip.mapPoints.length; i++) {
                    myLat.push(data.trip.mapPoints[i].lat);
                    myLng.push(data.trip.mapPoints[i].lng);
                }
                $('.mapDistanceTotalsDiv').empty();
                $('#map2').empty().css('height', '500px')
                setTimeout(initRouteMap, 800, myLat, myLng);
                
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
            colabId: $('.colabShare').attr('name')
            //admin: $('.adminShare').is(":checked")
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
        $('.shareTripPage').delay(500).fadeIn().css('display', 'grid');
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

displayColabTripDetails()
shareTrip()
deleteColabTrips()
shareTripFormLoad()
findColaborator()
selectColaborator()

