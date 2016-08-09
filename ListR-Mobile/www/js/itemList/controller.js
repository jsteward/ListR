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
