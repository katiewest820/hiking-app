//Load trip demo page
function demoPage() {
    $('.tripPageDemo').on('click', function() {
        $('.tripDetails').empty();
        $('.introPage').css('display', 'none');
        $('.tripDetails').fadeIn();
        $('body').css('overflow', 'visible');
        //demo page template using archives template start
        let gearData = {};
        let foodData = {};
        for (let owner in demoTrip.orderGearList) {
            gearData[owner] = { 'gearList': demoTrip.orderGearList[owner] }
        }
        for (let owner in demoTrip.orderFoodList) {
            foodData[owner] = { 'foodList': demoTrip.orderFoodList[owner] }
        }
        let vals = {
            trailHead: demoTrip.trip.trailheadName.split(' ').join('+'),
            trail: demoTrip.trip.trail,
            startDate: moment(demoTrip.trip.startDate).utc().format('MMM Do YYYY'),
            endDate: moment(demoTrip.trip.endDate).utc().format('MMM Do YYYY'),
            gearData: gearData,
            foodData: foodData
        };
        let templateScript = Handlebars.templates.archivedTripDetails(vals);
        $('.tripDetails').append(templateScript);
        //demo page template end
        calculatePackWeight(demoTrip);
        let myLat = [];
        let myLng = [];
        for (let i = 0; i < demoTrip.trip.mapPoints.length; i++) {
            myLat.push(demoTrip.trip.mapPoints[i].lat);
            myLng.push(demoTrip.trip.mapPoints[i].lng);
        };
        $('.mapDistanceTotalsDiv').empty();
        $('#map2').empty().css('height', '500px');
        setTimeout(initRouteMap, 400, myLat, myLng);
        $('.backToArchives').css('display','none');
        $('.tripDetails').append(`<i aria-hidden="true" class="fa fa-arrow-left fa-2x backToLogin" title="Back to Login"></i>`);
    });
}

//Return to landing page
function leaveDemoPage(){
    $('.tripDetails').on('click', '.backToLogin', function(){
        $('body').css('overflow', 'hidden');
        $('.backToLogin').css('display','none');
        $('.backToArchives').css('display', 'block');
        $('.tripDetails').css('display', 'none');
        $('.introPage').fadeIn();
    });
}

//Logs you into demo account from intro page
function loadDemoAct(){
    $('.demoLogin').on('click', function(){
        let userLoginInfo = {
            email: 'johnsmith@email.com',
            password: 'password123'
        }
        loginApiCall(userLoginInfo);
    });
}

demoPage()
leaveDemoPage() 
loadDemoAct()
