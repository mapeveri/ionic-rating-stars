Ionic Rating Stars
===================

This directive angular.js contains one container for rating with stars.

Install
-------

Via bower::

    bower install ionic-rating-stars

Getting started
---------------

1. Add script js::

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
    <script src="bower_components/ionic-rating-stars/dist/js/ionic-rating-stars.min.js"></script>

2. Add the module **ionic-rating-stars** to module main::

    var App = angular.module("MainApp", ["ionic-rating-stars"]);

3. Add to html this line::

    <rating-stars ng-model="rating" max="max_stars"></rating-stars>

4. Get the selected value. In your controller you can access in this way::

      alert($scope.rating);

Attributes
----------

1. Model: This attribute is the model (the your controller) that contains the value clicked.

2. Max: This attribute is for indicate the maximum amount of stars.

Example
-------

Check the file `index`_.

.. image:: https://github.com/mapeveri/ionic-rating-stars/blob/master/images/example.png

.. _index: https://github.com/mapeveri/ionic-rating-stars/blob/master/example/index.html
