angular.module('listr.login.controller', [])
    .controller('loginCtrl', function ($scope, $ionicModal, $timeout, user, $state, $cordovaOauth) {
        let ctrl = this;

        ctrl.loginData = {};
        ctrl.login = login;
        
        function login() {
            let clientId = 309438982739069;
            let options = { redirect_uri : 'http://localhost:4400/callback'};
            //$cordovaOauth.facebook(clientId, ["email", "user_friends", "public_profile"], options).then(function (result) {
                //$localStorage.accessToken = result.access_token;
                //$location.path("/profile");
            //    console.log(result);
            //}, function (error) {
           //     alert("There was a problem signing in!  See the console for logs");
           //     console.log(error);
           // });


            

            ctrl.loginData.id = 1;
            ctrl.loginData.uuid = device.uuid;


            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system


            $timeout(function () {
                var fakeUser = { firstName: 'Jacques', lastName: 'Steward', userId: 1, emailAddress: 'jacques.steward@gmail.com', FacebookId: '', uuid: device.uuid };
                angular.extend(user, fakeUser);
                $state.go('app.lists');
            }, 1000);

        }

    });