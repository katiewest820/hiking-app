
//TODO cleanup fadein of already logged in user
function checkUserLogin() {
    if (localStorage.getItem('userId')) {
        $('.actLoginPage').css('display', 'none');
        $('.dashboardPage').delay(200).fadeIn();
        displayDashboardTrips();
        displayColabTrips();
    }
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
        $('.actLoginDiv').delay(300).fadeIn('slow').css('display', 'grid');
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
                    console.log('error 1')
                    return
                }
                if (response == 'this user does not exist') {
                    console.log('error 2')
                    return
                }
                if (response == 'password does not match email') {
                    console.log('error 3')
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

            })
            .fail((err) => {
                console.log(err)
            })
    });
}

//TODO create error messages for login
//TODO create error messages for registration

checkUserLogin()
logOut()
userLogin()

fadeInLoginDiv()