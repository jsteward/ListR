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