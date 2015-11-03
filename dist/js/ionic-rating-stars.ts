/// <reference path="angular.d.ts" />
/// <reference path="jquery.d.ts" />

(()=> {
  "use strict";
  var App = angular.module("ionic-rating-stars", []);

  //Filter for create array with count indicates
  App.filter("rangeionicstars", () => {
    return (n) => {
      var res: number[] = [];
      for (var i = 0; i < n; i++){
        res.push(i);
      }
      return res;
    }
  });

  //Directive rating-stars
  App.directive("ratingStars", ["$parse", "$timeout", ($parse, $timeout) => {
      return {
          restrict: 'E',
          template: (el, attr) => {
            var max: number;
            //Check if is defined the attribute max
            if(angular.isDefined(attr.max)){
              max = attr['max'];
            }else{
              max = 5;
            }
            //Template with the images
            var dataTemplate: string;
            dataTemplate = '<span ng-repeat="i in ' + max + ' | rangeionicstars">';
            dataTemplate += '<i class="ion-ios-star-outline" style="font-size: 30px;" id="rating_star_{{ i +1 }}" val="{{ i +1 }}" />'
            dataTemplate += '</span>';
            return dataTemplate;
          },
          require: 'ngModel',
          controller: ["$scope", ($scope) => {
            $scope.set_selected = function(id, max){
              var i: number;
              for(i=1;i<=max;i++){
                var el = angular.element(document.querySelector("#rating_star_" + i));
                if(i<=id){
                  el.removeClass("ion-ios-star-outline").addClass("ion-ios-star");
                }else{
                  el.removeClass("ion-ios-star").addClass("ion-ios-star-outline");
                }
              }
            }
          }],
          link: (scope, element, attr) => {
            //Value selected
            var selected: number;
            //Value attribute max
            var max: number;
            //Id clicked
            var id: number;
            //For get value model
            var value_model;
            //For get value max
            var value_max;

            //Parse attributes
            value_model = $parse(attr['ngModel']);
            value_max = $parse(attr['max']);
            //Get element default
            selected = value_model(scope);
            max = value_max(scope);
            //Set value default
            $timeout(function(){
              scope.set_selected(selected, max);
            });

            //Click in stars
            element.bind('click', function(e){
              try {
                id = parseInt(e.srcElement.attributes.val.value);
              } catch (e) {
                id = 0;
              } finally {
                value_model.assign(scope, id);
                scope.$apply();
                scope.set_selected(id, max);
              }
            });

            //Hoover in the stars
            element.on('mouseover', function(e) {
              try {
                id = e.srcElement.attributes.val.value;
              } catch (e) {
                id = 0;
              } finally {
                scope.set_selected(id, max);
              }
            });

            //When I get out of the container, get value clicked
            element.on('mouseleave', function(e) {
              try {
                id = value_model(scope);
              } catch (e) {
                id = 0;
              } finally {
                scope.set_selected(id, max);
              }
            });
          }
      };
  }]);
})();
