(function () {
    function listsService($resource) {

        var url = 'http://localhost:50779/api/lists/:listId';
        var svc = this;
        var settings = { cache: true, isArray: true };

        var resource = $resource(url, { }, { update: { method: 'PUT' } }, settings);

        svc.addList = addList;

        svc.deleteList = deleteList;

        svc.getAllLists = getAllLists;

        function addList(list) {
            return resource.save(list).$promise;
        }

        function deleteList(list) {
            return resource.delete({ 'listId': list.id }).$promise;
        }

        function getAllLists(user) {
            return resource.query({ 'userId': user.userId }).$promise;
        }
    }

    angular.module('listr.lists.service', [])
        .service('listsService', listsService);

})();

