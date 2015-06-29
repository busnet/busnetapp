'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:AddRideModalCtrl
 * @description
 * # AddRideModalCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp')
  .controller('AddRideModalCtrl', function ($scope, $state, ride) {
    $scope.ride = ride;
    $scope.close = function(){
    	$close(true);
    	$state.go('app.rides');
    }
  });
