'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.error', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.error', {
	      url: '/error/:error',
	      templateUrl: 'views/error.html',
	      controller: 'ErrorCtrl',
	      accessLevel: accessLevels.public
	    });
	})
  .controller('ErrorCtrl', function ($scope) {
    
  });
