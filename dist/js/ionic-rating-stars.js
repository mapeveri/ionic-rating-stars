(function () {
    "use strict";
    angular.module("ionic-rating-stars", [])
        .filter("rangeionicstars", function () {
        return function (n) {
            var res = [];
            for (var i = 0; i < n; i++) {
                res.push(i);
            }
            return res;
        };
    })
        .directive("ratingStars", ["$parse", "$timeout", "$document", function ($parse, $timeout, $document) {
            return {
                restrict: 'E',
                template: function (el, attr) {
                    var max;
                    if (angular.isDefined(attr.max)) {
                        max = attr['max'];
                    }
                    else {
                        max = 5;
                    }
                    var dataTemplate;
                    dataTemplate = '<span ng-repeat="i in ' + max + ' | rangeionicstars">';
                    dataTemplate += '<i class="ion-ios-star-outline" style="font-size: 30px;" id="rating_star_{{ i +1 }}" val="{{ i +1 }}" />';
                    dataTemplate += '</span>';
                    return dataTemplate;
                },
                require: 'ngModel',
                controller: ["$scope", function ($scope) {
                        $scope.set_selected = function (id, max) {
                            var i;
                            for (i = 1; i <= max; i++) {
                                var el = angular.element($document[0].querySelector("#rating_star_" + i));
                                if (i <= id) {
                                    el.removeClass("ion-ios-star-outline").addClass("ion-ios-star");
                                }
                                else {
                                    el.removeClass("ion-ios-star").addClass("ion-ios-star-outline");
                                }
                            }
                        };
                    }],
                link: function (scope, element, attr) {
                    var selected;
                    var max;
                    var id;
                    var value_model;
                    var value_max;
                    value_model = $parse(attr['ngModel']);
                    selected = value_model(scope);
                    if (angular.isDefined(attr.max)) {
                        value_max = $parse(attr['max']);
                        max = value_max(scope);
                    }
                    else {
                        max = 5;
                    }
                    $timeout(function () {
                        scope.set_selected(selected, max);
                    });
                    element.bind('click', function (e) {
                        try {
                            id = parseInt(e.srcElement.attributes.val.value);
                        }
                        catch (e) {
                            id = 0;
                        }
                        finally {
                            value_model.assign(scope, id);
                            scope.$apply();
                            if (angular.isDefined(attr.max)) {
                                max = value_max(scope);
                            }
                            else {
                                max = 5;
                            }
                            scope.set_selected(id, max);
                        }
                    });
                    element.on('mouseover', function (e) {
                        try {
                            id = e.srcElement.attributes.val.value;
                        }
                        catch (e) {
                            id = 0;
                        }
                        finally {
                            if (angular.isDefined(attr.max)) {
                                max = value_max(scope);
                            }
                            else {
                                max = 5;
                            }
                            scope.set_selected(id, max);
                        }
                    });
                    element.on('mouseleave', function (e) {
                        try {
                            id = value_model(scope);
                        }
                        catch (e) {
                            id = 0;
                        }
                        finally {
                            if (angular.isDefined(attr.max)) {
                                max = value_max(scope);
                            }
                            else {
                                max = 5;
                            }
                            scope.set_selected(id, max);
                        }
                    });
                    scope.$watch(attr['ngModel'], function (v) {
                        if (angular.isDefined(attr.max)) {
                            max = value_max(scope);
                        }
                        else {
                            max = 5;
                        }
                        if (v == 0) {
                            scope.set_selected(0, max);
                        }
                        else {
                            $timeout(function () {
                                scope.set_selected(v, max);
                            });
                        }
                    });
                }
            };
        }]);
})();
