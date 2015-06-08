'use strict';

/**
 new made by Alex
 */
angular.module('busnetApp.settings', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	    $stateProvider
	    .state('app.settings', {
	        url: '/settings',
	        templateUrl: 'views/settings.html',
	        controller: 'SettingsCtrl',
	        accessLevel: accessLevels.user
	    });
	})
	.controller('SettingsCtrl', function ($scope) {
	    $scope.awesomeThings = [
		  'HTML5 Boilerplate',
		  'AngularJS',
		  'Karma'
		];
	});
