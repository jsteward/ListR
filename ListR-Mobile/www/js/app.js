// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('listr', [
        'ionic',
        'starter.controllers',
        'listr.lists',
        'listr.itemList',
        'listr.login',
        'ngResource'
    ])
    .run(function($ionicPlatform, $timeout, $state, $ionicLoading) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $ionicLoading.show({
                template: 'Loading...'
            });
            //here is where the login info will go
            $timeout(function() {
                $state.go('login');
                $ionicLoading.hide();
            }, 1000);
        });
    })
    .value('user', {})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('init', {
            url: '/init',
            template: ''
        })
    .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })
    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })
    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })
    .state('app.lists', {
          url: '/lists',
          views: {
              'menuContent': {
                  templateUrl: 'templates/lists.html',
                  controller: 'listsCtrl',
                  controllerAs: 'listsCtrl'
              }
          }
      })
    .state('app.single', {
        url: '/list/:listId',
        views: {
            'menuContent': {
                templateUrl: 'templates/list.html',
                controller: 'itemCtrl',
                controllerAs: 'itemCtrl'
            }
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl',
        controllerAs: 'loginCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/init');
});
