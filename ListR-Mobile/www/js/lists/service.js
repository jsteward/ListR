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

