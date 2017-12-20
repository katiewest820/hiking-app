
//TODO cleanup fadein of already logged in user
function checkUserLogin() {
    if (localStorage.getItem('userId')) {
        //$('.actLoginPage').css('display', 'none');
        $('.dashboardPage').fadeIn();
        $('body').css('overflow', 'visible');
        displayDashboardTrips();
        displayColabTrips();
        return
    }
    $('.actLoginPage').fadeIn()
}

function logOut() {
    $('.logOut').on('click', function() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        $('body').css('overflow', 'hidden');
        $('.dashboardPage').fadeOut();
        $('.actLoginPage').delay(400).fadeIn();
    });
}

function fadeInLoginDiv(){
    $('.loginImg').on('mouseenter', function(){
        $('.loginImg').fadeOut('slow');
        $('.actLoginDiv').delay(500).fadeIn('slow')//.css('display', 'grid');
    })  
}

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
            })
            .done((response) => {
                console.log(response)
                if (response == 'you must enter a username and password') {
                    loginErrorMsg('Please enter your email and password to login');
                    return
                }
                if (response == 'this user does not exist') {
                    loginErrorMsg('Email doesn\'t exist in our records. Click register to create an account');
                    return
                }
                if (response == 'password does not match email') {
                    loginErrorMsg('Incorrect password. Please try again');
                    return
                }
                localStorage.setItem('tokenKey', response.token);
                localStorage.setItem('userId', response.userId);
                console.log(myStorage)
                $('.actLoginPage').fadeOut();
                $('.dashboardPage').delay(400).fadeIn();
                $('.emailLogin').empty();
                $('.passwordLogin').empty();
                $('body').css('overflow', 'visible');
                displayColabTrips();
                displayDashboardTrips();
                $('.actLoginDiv').children('input').each((index, element)=> {
                    $(element).val('')
                })

            })
            .fail((err) => {
                console.log(err)
            })
    });
}

function loginErrorMsg(msg){
   //TODO refactor to one error function
    $('.actLoginPage').fadeOut().delay(2200).fadeIn();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut()
    $('.errorMsgDiv').html(`<p>${msg}</p>`)
}

function registrationErrorMsg(msg){
   //TODO refactor to one error function
    $('.actRegisterPage').fadeOut().delay(2000).fadeIn();
    $('.errorMsgPage').delay(300).fadeIn().delay(1500).fadeOut()
    $('.errorMsgDiv').html(`<p>${msg}</p>`)
}
function registrationSuccessMsg(msg){
    $('.actRegisterPage').fadeOut();
    $('.errorMsgPage').delay(400).fadeIn().delay(1400).fadeOut();
    $('.errorMsgDiv').html(`<p>${msg}</p>`);
    $('.actLoginPage').delay(2600).fadeIn();
}

function loadRegisterPage(){
    $('.createActBtn').on('click', function(){
        $('.actLoginPage').fadeOut();
        $('.actRegisterPage').delay(400).fadeIn()
        $('.actRegisterDiv').css('display', 'block');
    });
}

function cancelRegistration(){
    $('.cancelRegistrationBtn').on('click', function(){
        $('.actRegisterPage').fadeOut()
        $('.actLoginPage').delay(400).fadeIn();
    });
}

function createNewUser(){
    $('.registrationSubmitBtn').on('click', function(){
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
        })
        .done((response) => {
            console.log(response)
            if(response == 'An account already exists for this email'){
                registrationErrorMsg('An account already exists for this email. Please login');
                return
            }
            if(response == 'please enter an email address'){
                registrationErrorMsg('Please enter an email address');
                return
            }
            if(response == 'please enter a password'){
                registrationErrorMsg('Please enter a password');
                return
            }
            if(response == 'please enter a first and last name'){
                registrationErrorMsg('Please enter a first and last name')
                return
            }
           registrationSuccessMsg('Your account was successfully created!')
           $('.actRegisterDiv').children('input').each((index, element)=> {
                $(element).val('')
            })

        })
        .fail((err) => {
            console.log(err)
        });
    });
}
//TODO create error messages for registration

checkUserLogin()
logOut()
userLogin()
fadeInLoginDiv()
loadRegisterPage()
cancelRegistration()
createNewUser()