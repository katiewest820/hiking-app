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

loadDemoAct()
