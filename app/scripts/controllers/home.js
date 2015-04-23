'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.home', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.home', {
	      url: '/',
	      templateUrl: 'views/home.html',
	      controller: 'HomeCtrl',
	      accessLevel: accessLevels.public
	    });
	})
	.controller('HomeCtrl', function ($scope) {

	});
