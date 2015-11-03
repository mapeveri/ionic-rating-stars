(function () {
    "use strict";
    var App = angular.module("ionic-rating-stars", []);
    App.filter("range", function () {
        return function (n) {
            var res = [];
            for (var i = 0; i < n; i++) {
                res.push(i);
            }
            return res;
        };
    });
    App.directive("ratingStars", ["$parse", "$timeout", function ($parse, $timeout) {
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
                    dataTemplate = '<span ng-repeat="i in ' + max + ' | range">';
                    dataTemplate += '<i class="ion-ios-star-outline" style="font-size: 30px;" id="rating_star_{{ i +1 }}" val="{{ i +1 }}" />';
                    dataTemplate += '</span>';
                    return dataTemplate;
                },
                require: 'ngModel',
                controller: ["$scope", function ($scope) {
                        $scope.set_selected = function (id, max) {
                            var i;
                            for (i = 1; i <= max; i++) {
                                var el = angular.element(document.querySelector("#rating_star_" + i));
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
                    value_max = $parse(attr['max']);
                    selected = value_model(scope);
                    max = value_max(scope);
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
                            scope.set_selected(id, max);
                        }
                    });
                }
            };
        }]);
})();
