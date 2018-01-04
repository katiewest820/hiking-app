//If user is logged in dashboard loads
function checkUserLogin() {
    if (localStorage.getItem('userId')) {
        $('.dashboardPage').fadeIn();
        $('body').css('overflow', 'visible');
        displayDashboardTrips();
        displayColabTrips();
        return
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
        $('.dashboardPage').fadeOut();
        $('.introPage').delay(400).fadeIn();
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
                loginErrorMsg('Email doesn\'t exist in our records. Click register to create an account');
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
            console.log(err)
        });
    });
}

//Login error messages
function loginErrorMsg(msg) {
    $('.actLoginPage').fadeOut().delay(2200).fadeIn();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut();
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
}

function registrationErrorMsg(msg) {
    $('.actRegisterPage').fadeOut().delay(2200).fadeIn();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut();
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
}

//Registration success message
function registrationSuccessMsg(msg) {
    $('.actRegisterPage').fadeOut();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut();
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
    $('.actLoginPage').delay(2600).fadeIn();
}

//Loads register page when user clicks 'register'
function loadRegisterPage() {
    $('.createActBtn').on('click', function() {
        $('.introPage').fadeOut();
        $('.actRegisterPage').delay(300).fadeIn();
        $('.actRegisterDiv').css('display', 'block');
    });
}

//Loads login page when user clicks 'login'
function loadLoginPage() {
    $('.loginPageLoadBtn').on('click', function(){
        $('.introPage').fadeOut();
        $('.actLoginPage').delay(300).fadeIn();
        $('.actLoginDiv').css('display', 'block');
    });
}

//Cancels login or registration and returns to start page
function cancelRegistrationOrLogin() {
    $('.cancelRegistrationBtn').on('click', function() {
        let divToFade = $(this).parent('div');
        $(divToFade).fadeOut();
        $('.introPage').delay(300).fadeIn();
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
                registrationErrorMsg('Please enter a first and last name')
                return;
            }
            registrationSuccessMsg('Your account was successfully created!');
            $('.actRegisterDiv').children('input').each((index, element) => {
                $(element).val('')
            });
        }).fail((err) => {
            console.log(err);
        });
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