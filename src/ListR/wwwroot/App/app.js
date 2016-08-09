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