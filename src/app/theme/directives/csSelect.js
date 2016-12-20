angular.module('UApps.theme').
directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '<input type="checkbox"/>',
        scope: {
            row: '=csSelect',
            items: "=csSelectItems"
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {

                    ctrl.select(scope.row, 'multiple');

                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    scope.items.push(scope.row);
                    element.parent().addClass('st-selected');
                } else {
                    scope.items.pop(scope.row);
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
});