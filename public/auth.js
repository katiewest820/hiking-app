//If user is logged in dashboard loads
function checkUserLogin() {
    if (localStorage.getItem('userId')) {
        $('.dashboardPage').fadeIn();
        $('body').css('overflow', 'visible');
        displayDashboardTrips();
        displayColabTrips();
        return;
    }
    $('.introPage').fadeIn();
    $('.helpBtn').css('display', 'none');
}

//Logs user out
function logOut() {
    $('.logOut').on('click', function() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        $('body').css('overflow', 'hidden');
        $('.helpBtn').fadeOut();
        $('.dashboardPage').css('display', 'none');
        $('.introPage').fadeIn();
    });
}

//Start image fades upon mouseover
function fadeInLoginDiv() {
    $('.loginImg').on('mouseenter', function() {
        $('.loginImg').fadeOut(600);
        $('.aboutSite').delay(700).fadeIn();
    });
}

//Logs user in
function userLogin() {
    $('.loginBtn').on('click', function() {
        let userLoginInfo = {
            email: $('.emailLogin').val(),
            password: $('.passwordLogin').val()
        }
      loginApiCall(userLoginInfo);
    });
}

function loginApiCall(userLoginInfo){
      $.ajax({
            url: `${myURL}auth/login`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userLoginInfo)
        }).done((response) => {
            if (response == 'you must enter a username and password') {
                loginErrorMsg('Please enter your email and password to login');
                return;
            }
            if (response == 'this user does not exist') {
                loginErrorMsg('Email does not exist in our records. Please register for an account');
                return;
            }
            if (response == 'password does not match email') {
                loginErrorMsg('Incorrect password. Please try again');
                return;
            }
            localStorage.setItem('tokenKey', response.token);
            localStorage.setItem('userId', response.userId);
            $('.actLoginPage').fadeOut();
            $('.dashboardPage').delay(400).fadeIn();
            $('.emailLogin').empty();
            $('.passwordLogin').empty();
            $('body').css('overflow', 'visible');
            displayColabTrips();
            displayDashboardTrips();
            $('.actLoginDiv').children('input').each((index, element) => {
                $(element).val('');
            });
        }).fail((err) => {
            console.log(err);
        });
}

//Login error messages
function loginErrorMsg(msg) {
    $('.actLoginPage').css('display', 'none');
    $('.errorMsgPage').fadeIn().delay(1400).fadeOut(200, () => {
        $('.actLoginPage').fadeIn();
    });
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
}

function registrationErrorMsg(msg) {
    $('.actRegisterPage').fadeOut().delay(2200).fadeIn();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut();
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
}

//Registration success message
function registrationSuccessMsg(msg, userLoginInfo) {
    $('.actRegisterPage').css('display', 'none');
    $('.errorMsgPage').fadeIn().delay(1000).fadeOut(200, () => {
       loginApiCall(userLoginInfo); 
    });
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
    
}

//Loads register page when user clicks 'register'
function loadRegisterPage() {
    $('.createActBtn').on('click', function() {
        $('.introPage').css('display', 'none');
        $('.actRegisterPage').fadeIn();
        $('.actRegisterDiv').css('display', 'block');
    });
}

//Loads login page when user clicks 'login'
function loadLoginPage() {
    $('.loginPageLoadBtn').on('click', function() {
        $('.introPage').css('display', 'none');
        $('.actLoginPage').fadeIn();
        $('.actLoginDiv').css('display', 'block');
    });
}

//Cancels login or registration and returns to start page
function cancelRegistrationOrLogin() {
    $('.cancelRegistrationBtn').on('click', function() {
        let divToFade = $(this).parent('div');
        $(divToFade).css('display', 'none');
        $('.introPage').fadeIn();
    });
}

//Registers new user
function createNewUser() {
    $('.registrationSubmitBtn').on('click', function() {
        let newUser = {
            firstName: $('.registrationFN').val(),
            lastName: $('.registrationLN').val(),
            email: $('.registrationEmail').val(),
            password: $('.registrationPassword').val()
        }
        let userLoginInfo = {
            email: $('.registrationEmail').val(),
            password: $('.registrationPassword').val()
        }
        $.ajax({
            url: `${myURL}auth/register/`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newUser)
        }).done((response) => {
            if (response == 'An account already exists for this email') {
                registrationErrorMsg('An account already exists for this email. Please login');
                return;
            }
            if (response == 'please enter an email address') {
                registrationErrorMsg('Please enter an email address');
                return;
            }
            if (response == 'please enter a password') {
                registrationErrorMsg('Please enter a password');
                return;
            }
            if (response == 'please enter a first and last name') {
                registrationErrorMsg('Please enter a first and last name');
                return;
            }
            registrationSuccessMsg('Your account was successfully created!', userLoginInfo);
            
            $('.actRegisterDiv').children('input').each((index, element) => {
                $(element).val('');
            });
        }).fail((err) => {
            console.log(err);
        });
    });
}

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

checkUserLogin()
logOut()
userLogin()
fadeInLoginDiv()
loadRegisterPage()
loadLoginPage()
cancelRegistrationOrLogin()
createNewUser()
demoPage()
leaveDemoPage()