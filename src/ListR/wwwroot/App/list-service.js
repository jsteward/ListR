﻿(function () {

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