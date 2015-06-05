'use strict';

/**
 new made by Alex
 */
angular.module('busnetApp.company-details', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.company-details', {
	      url: '/company-details',
	      templateUrl: 'views/company-details.html',
	      controller: 'CompanyDetailsCtrl',
	      accessLevel: accessLevels.user
	    });
	})
	.controller('CompanyDetailsCtrl', function ($scope) {
		$scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
	});
