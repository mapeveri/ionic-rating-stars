/// <reference path="angular.d.ts" />
/// <reference path="jquery.d.ts" />

(()=> {
  "use strict";
  angular.module("ionic-rating-stars", [])
  .filter("rangeionicstars", () => {
    /**
      * @name rangeionicstars
      * @desc Filter for create array with count indicates
      * @param {Integer} n: Cant loop
    */
    return (n) => {
      var res: number[] = [];
      for (var i = 0; i < n; i++){
        res.push(i);
      }
      return res;
    }
  })
  /**
    * @desc This directive angular.js contains one container for rating with stars.
    * @example <rating-stars ng-model="rating" max="max_stars"></rating-stars>
  */
  .directive("ratingStars", ["$parse", "$timeout", "$document", ($parse, $timeout, $document) => {
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
            /**
              * @name set_selected
              * @desc Remove or add class to item selected
              * @param {Integer} id: Id item selected
              * @param {Integer} max: Cant total of stars
            */
            $scope.set_selected = function(id, max){
              var i: number;
              for(i=1;i<=max;i++){
                var el = angular.element($document[0].querySelector("#rating_star_" + i));
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

            //Parse attribute
            value_model = $parse(attr['ngModel']);
            //Get element default
            selected = value_model(scope);

            //Check if has attr max
            if(angular.isDefined(attr.max)){
              value_max = $parse(attr['max']);
              max = value_max(scope);
            }else{
              max = 5;
            }

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
                //Check if has attr max
                if(angular.isDefined(attr.max)){
                  max = value_max(scope);
                }else{
                  max = 5;
                }
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
                //Check if has attr max
                if(angular.isDefined(attr.max)){
                  max = value_max(scope);
                }else{
                  max = 5;
                }
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
                //Check if has attr max
                if(angular.isDefined(attr.max)){
                  max = value_max(scope);
                }else{
                  max = 5;
                }
                scope.set_selected(id, max);
              }
            });

            //If change the value model reset hoover
            scope.$watch(attr['ngModel'], function(v){
                //Check if has attr max
                if(angular.isDefined(attr.max)){
                  max = value_max(scope);
                }else{
                  max = 5;
                }
                //Check if value is default
                if(v==0){
                  scope.set_selected(0, max);
                }else{
                  $timeout(function () {
                    scope.set_selected(v, max);
                  });
                }
            });

          }
      };
  }]);
})();
