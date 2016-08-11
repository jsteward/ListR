angular.module('listr.login.controller', [])
    .controller('loginCtrl', function ($scope, $ionicModal, $timeout, user, $state) {
        let ctrl = this;

        ctrl.loginData = {};
        ctrl.login = login;
        
        function login() {
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