'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:AddRideModalCtrl
 * @description
 * # AddRideModalCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp')
  .controller('AddRideModalCtrl', function ($scope, ride) {
    $scope.ride = ride;
  });
