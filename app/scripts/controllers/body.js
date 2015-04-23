'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the busnetApp
 */

angular.module('busnetApp')
  .controller('BodyCtrl', function ($scope, $state, $stateParams, loginService, $http, $timeout) {
	// Expose $state and $stateParams to the <body> tag
	$scope.$state = $state;
	$scope.$stateParams = $stateParams;
  });
