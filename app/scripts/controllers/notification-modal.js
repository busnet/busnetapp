'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:NotificationModalCtrl
 * @description
 * # NotificationModalCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp')
  .controller('NotificationModalCtrl', function ($scope, $state, notification) {
    $scope.notification = notification;
  });
