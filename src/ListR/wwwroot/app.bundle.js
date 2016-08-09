(function () {
    angular.module('shoppinglist', [
        'ngRoute',
        'ngResource',
        'shoppinglist.controller',
        'shoppinglist.routes',
        'hmTouchEvents',
        'shoppinglist.component.item',
        'item.service'
    ]);
})();
(function () {
    function itemController($element, $interval) {
        var ctrl = this;
        ctrl.dragEnd = dragEnd;
        ctrl.dragLeft = dragLeft;
        ctrl.style = {};

        var delay = 200;

        ctrl.quantityUp = _.throttle(quantityUp, delay);
        ctrl.quantityDown = _.throttle(quantityDown, delay);

        

        var onUpdate = _.debounce(() => { ctrl.onUpdate(ctrl.item); }, 1000);

        var upEle = $element[0].querySelector('.item-quantity-add button');
        setUpTouchStart(upEle, (event) => { ctrl.quantityUp(event); });

        var downEle = $element[0].querySelector('.item-quantity-sub button');
        setUpTouchStart(downEle, (event) => { ctrl.quantityDown(event); });


        function dragLeft(event) {
            var dist = event.gesture.distance;
            ctrl.style.transform = "translate3d(" + (dist * -1) + "px, 0,0)";
            ctrl.style.opacity = 1 - ((dist - 100) / 100);
        }

        function dragEnd(event) {
            
            var gesture = event.gesture;
            if (gesture.direction === "left" && gesture.distance > 100) {
                ctrl.onDelete({ item: ctrl.item });
            }
            ctrl.style.transform = "translate3d(0,0,0)";
            ctrl.style.opacity = 1;
        }

        function quantityUp(event) {
            ctrl.item.quantity = ctrl.item.quantity+1;
            onUpdate();


        }

        function quantityDown() {
            ctrl.item.quantity = ctrl.item.quantity-1;
            onUpdate();
        }


        function setUpTouchStart(ele, touchFunction) {
            var timer = null;
            angular.element(ele).on('touchstart', (event) => {
                timer = $interval(() => {
                    touchFunction(event);
                }, delay);
            });

            angular.element(ele).on('touchend', (event) => {
                $interval.cancel(timer);
                timer = null;
            });
            
        }




    }

    angular.module('shoppinglist.component.item', [])
        .component('listItem', {
            templateUrl: 'views/item/index.html',
            controller: itemController,
            bindings: {
                item: '<',
                onDelete: '&',
                onUpdate: '&'
            }
        });

})();
/// <reference path="../../views/values/index.html" />
(function () {
    function shoppinglistController(itemService, $routeParams) {
        var ctrl = this;
        ctrl.items = [];
        ctrl.newItemName = "";
        
        
        ctrl.addItem = addItem;
        ctrl.quickAddItem = quickAddItem;
        ctrl.removeItem = removeItem;
        ctrl.updateItem = updateItem;

        init();
        
        function removeItem(item) {
            itemService.deleteItem(item).then(() => {
                var index = _.findIndex(ctrl.items, { name: item.name });
                ctrl.items.splice(index, 1);
            });
        }

        function quickAddItem() {
            if (ctrl.newItemName !== "" && !_.find(ctrl.items, { name: ctrl.newItemName })) {
                var item = { 'name': ctrl.newItemName, quantity: '1', notes: '', complete: 'false', listId: $routeParams.listId };
                ctrl.addItem(item);
            }

        }

        function addItem(item) {
            itemService.addItem(item).then((resp) => {
                ctrl.items.unshift(resp);
                ctrl.newItemName = "";
            });
            
        }

        function updateItem(item) {
            itemService.editItem(item);
            
        }

        function init() {
            itemService.getAll(1).then((resp) => { ctrl.items = resp; });
        }
    }

    angular.module('shoppinglist.controller', [])
        .controller('shoppinglistController', shoppinglistController);
})();
(function () {
    function shoppingListRouteConfiguration($routeProvider) {
        $routeProvider.when('/:listId', {
            templateUrl: 'views/list/index.html',
            controller: 'shoppinglistController',
            controllerAs: 'ctrl'
        });

        $routeProvider.otherwise("/1");

    }

    angular.module('shoppinglist.routes', ['ngRoute'])
        .config(['$routeProvider', shoppingListRouteConfiguration]);
})();
(function () {

    function listService() {
        
    }


    function itemService($resource) {
        var svc = this;

        var url = '/api/lists/:listId/items/:itemId';
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

    angular.module('item.service', [])
    .service('listservice',listService)
    .service('itemService', itemService);
})();