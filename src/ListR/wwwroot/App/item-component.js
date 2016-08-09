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