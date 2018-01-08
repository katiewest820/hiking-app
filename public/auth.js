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
            $('.introPage').fadeOut();
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
    $('.errorMsgPage').fadeIn().delay(1000).fadeOut(200, () => {
        $('.actLoginPage').fadeIn();
    });
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
}

//Registration error messages
function registrationErrorMsg(msg) {
    $('.actRegisterPage').css('display', 'none');
    $('.errorMsgPage').fadeIn().delay(1000).fadeOut(200, () => {
        $('.actRegisterPage').fadeIn();
    });
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

checkUserLogin()
logOut()
userLogin()
fadeInLoginDiv()
loadRegisterPage()
loadLoginPage()
cancelRegistrationOrLogin()
createNewUser()