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