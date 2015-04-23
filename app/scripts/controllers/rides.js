'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RidesCtrl
 * @description
 * # RidesCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.rides', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.rides', {
	      url: '/rides',
	      templateUrl: 'views/rides.html',
	      controller: 'RidesCtrl',
	      accessLevel: accessLevels.user
	    });
	})
  .controller('RidesCtrl', function ($scope) {
    
  });
