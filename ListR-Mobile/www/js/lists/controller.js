angular.module('listr.lists.controller', [])
  .controller('listsCtrl', function ($scope, listsService, user, $ionicLoading) {
        let ctrl = this;
        ctrl.lists = [];
        ctrl.newListName = "";
        ctrl.addList = addList;
        ctrl.quickAddList = quickAddList;
        ctrl.removeList = removeList;

        $scope.$on('$ionicView.enter', init);

        function init() {
            $ionicLoading.show({
                template: 'Loading...'
            });
            listsService.getAllLists(user).then((resp) => {
                ctrl.lists = resp;
                $ionicLoading.hide();
            });
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
