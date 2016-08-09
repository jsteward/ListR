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
