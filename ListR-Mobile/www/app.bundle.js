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
    'ngResource'
])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

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
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/lists');
});

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// .controller('ListsCtrl', listCtrl)

// .controller('listCtrl', function($scope, $stateParams) {
//   $scope.items = [
//     { name: 'Tomatoes', id: 1, quantity:2 },
//     { name: 'Bread', id: 2, quantity:2 },
//     { name: 'Milk', id: 3, quantity:2 },
//     { name: 'Butter', id: 4, quantity:2 },
//     { name: 'Salt', id: 5, quantity:2 },
//     { name: 'Mayonaise', id: 6, quantity:2 },
//     { name: 'Tomatoes', id: 1, quantity:2 },
//     { name: 'Bread', id: 2, quantity:2 },
//     { name: 'Milk', id: 3, quantity:2 },
//     { name: 'Butter', id: 4, quantity:2 },
//     { name: 'Salt', id: 5, quantity:2 },
//     { name: 'Mayonaise', id: 6, quantity:2 }
//   ];
//
// });





// function listCtrl($scope) {
//     $scope.lists = [
//       { title: 'Shopping', id: 1 }
//     ];
// }

// Platform specific overrides will be placed in the merges folder versions of this file
//(function () {
//    function itemController($element, $interval) {
//        var ctrl = this;
//        ctrl.dragEnd = dragEnd;
//        ctrl.dragLeft = dragLeft;
//        ctrl.style = {};

//        var delay = 200;

//        ctrl.quantityUp = _.throttle(quantityUp, delay);
//        ctrl.quantityDown = _.throttle(quantityDown, delay);



//        var onUpdate = _.debounce(() => { ctrl.onUpdate(ctrl.item); }, 1000);

//        var upEle = $element[0].querySelector('.item-quantity-add button');
//        setUpTouchStart(upEle, (event) => { ctrl.quantityUp(event); });

//        var downEle = $element[0].querySelector('.item-quantity-sub button');
//        setUpTouchStart(downEle, (event) => { ctrl.quantityDown(event); });


//        function dragLeft(event) {
//            var dist = event.gesture.distance;
//            ctrl.style.transform = "translate3d(" + (dist * -1) + "px, 0,0)";
//            ctrl.style.opacity = 1 - ((dist - 100) / 100);
//        }

//        function dragEnd(event) {

//            var gesture = event.gesture;
//            if (gesture.direction === "left" && gesture.distance > 100) {
//                ctrl.onDelete({ item: ctrl.item });
//            }
//            ctrl.style.transform = "translate3d(0,0,0)";
//            ctrl.style.opacity = 1;
//        }

//        function quantityUp(event) {
//            ctrl.item.quantity = ctrl.item.quantity + 1;
//            onUpdate();


//        }

//        function quantityDown() {
//            ctrl.item.quantity = ctrl.item.quantity - 1;
//            onUpdate();
//        }


//        function setUpTouchStart(ele, touchFunction) {
//            var timer = null;
//            angular.element(ele).on('touchstart', (event) => {
//                timer = $interval(() => {
//                    touchFunction(event);
//                }, delay);
//            });

//            angular.element(ele).on('touchend', (event) => {
//                $interval.cancel(timer);
//                timer = null;
//            });
//        }
//    }

//    angular.module('shoppinglist.component.item', [])
//        .component('listRItem', {
//            templateUrl: 'templates/components/ItemTemplate.html',
//            controller: itemController,
//            bindings: {
//                item: '<',
//                onDelete: '&',
//                onUpdate: '&'
//            }
//        });

//})();
angular.module('listr.itemList.controller', [])

.controller('itemCtrl', function ($scope, $stateParams, itemListService) {
    let ctrl = this;
    var delay = 200;

    ctrl.items = [];
    ctrl.newItemName = "";
    ctrl.removeItem = removeItem;
    ctrl.quickAddItem = quickAddItem;
    ctrl.addItem = addItem;

    init();

    ctrl.quantityUp = _.throttle(quantityUp, delay);
    ctrl.quantityDown = _.throttle(quantityDown, delay);

    var onUpdate = _.debounce(() => { onUpdate(ctrl.item); }, 1000);


    function removeItem(item) {

        itemListService.deleteItem(item).then(() => {
            var index = _.findIndex(ctrl.items, { name: item.name });
            ctrl.items.splice(index, 1);
        });
    }

    function quickAddItem() {
        if (ctrl.newItemName !== "" && !_.find(ctrl.items, { name: ctrl.newItemName })) {
            var item = { 'name': ctrl.newItemName, quantity: '1', notes: '', complete: 'false', listId: $stateParams.listId };
            ctrl.addItem(item);
        }

    }

    function addItem(item) {
        itemListService.addItem(item).then((resp) => {
            ctrl.items.unshift(resp);
            ctrl.newItemName = "";
        });

    }

    function init() {
        $scope.listCanSwipe = true;
        itemListService.getAll($stateParams.listId).then((resp) => { ctrl.items = resp; });
    }

    function quantityUp(item) {
        item.quantity = item.quantity + 1;
        onUpdate();
        itemListService.editItem(item);


    }

    function quantityDown(item) {
        item.quantity = item.quantity - 1;
        onUpdate();
        itemListService.editItem(item);
    }


});

angular.module('listr.itemList', ['listr.itemList.controller', 'listr.itemList.service']);

(function () {
    function itemListService($resource) {
        
        var url = 'http://localhost:50779/api/lists/:listId/items/:itemId';
        var svc = this;

        //var url = '/api/lists/:listId/items/:itemId';
        var settings = { cache: true, isArray: true };

        var resource = $resource(url, { 'listId': '@listId' }, { update: { method: 'PUT' } }, settings);

        svc.addItem = addItem;

        svc.editItem = editItem;

        svc.deleteItem = deleteItem;

        svc.getAll = getAll;

        //svc.getItem = getItem;

        function addItem(item) {
            return resource.save(item).$promise;
        }

        function editItem(item) {
            console.log(item);
            return resource.update(item).$promise;


        }

        function deleteItem(item) {
            return resource.delete({ 'itemId': item.id }).$promise;
        }



        function getAll(listId) {
            return resource.query({ 'listId': listId }).$promise;
        }
    }

    angular.module('listr.itemList.service', [])
        .service('itemListService', itemListService);
})();

angular.module('listr.lists.controller', [])
  .controller('listsCtrl', function ($scope, listsService) {
        let ctrl = this;
        ctrl.lists = [];
        init();
        ctrl.newListName = "";
        ctrl.addList = addList;
        ctrl.quickAddList = quickAddList;
        ctrl.removeList = removeList;

        function init() {
            listsService.getAllLists().then((resp) => { ctrl.lists = resp; });
        }

        function quickAddList() {
            if (ctrl.newListName !== "" && !_.find(ctrl.lists, { name: ctrl.newListName })) {
                var list = { 'listName': ctrl.newListName};
                ctrl.addList(list);
            }

        }

        function addList(newList) {
            listsService.addList(newList).then((resp) => {
                ctrl.lists.unshift(resp);
                ctrl.newListName = "";
            });
        }

        function removeList(list) {
            console.log(list);
            listsService.deleteList(list).then(() => {
                var index = _.findIndex(ctrl.lists, { name: list.name });
                ctrl.lists.splice(index, 1);
            });
        }
  });

angular.module('listr.lists', ['listr.lists.controller', 'listr.lists.service']);


(function () {
    function listsService($resource) {

        var url = 'http://localhost:50779/api/lists/:listId';
        var svc = this;

        //var url = '/api/lists/:listId/items/:itemId';
        var settings = { cache: true, isArray: true };

        var resource = $resource(url, { }, { update: { method: 'PUT' } }, settings);

        svc.addList = addList;

        //svc.editItem = editItem;

        svc.deleteList = deleteList;

        svc.getAllLists = getAllLists;

        //svc.getItem = getItem;

        function addList(list) {
            return resource.save(list).$promise;
        }

        function editItem(item) {
            console.log(item);
            return resource.update(item).$promise;


        }

        function deleteList(list) {
            return resource.delete({ 'listId': list.id }).$promise;
        }



        function getAllLists() {
            return resource.query().$promise;
        }
    }

    angular.module('listr.lists.service', [])
        .service('listsService', listsService);

})();
