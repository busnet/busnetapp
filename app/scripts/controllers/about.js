'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.about', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.about', {
	      url: '/about',
	      templateUrl: 'views/about.html',
	      controller: 'AboutCtrl',
	      accessLevel: accessLevels.user
	    });
	})
	.controller('AboutCtrl', function ($scope) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
	});
