'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the busnetApp
 */

angular.module('busnetApp')
  	.controller('BodyCtrl', function ($scope, $state, translations) {
  		$scope.$on('$stateChangeSuccess',
		function(event, toState, toParams, fromState, fromParams){
			var pageTitle = '';
			var addRideBtn = false;
		    switch($state.current.name){
	  			case 'app.rides':
	  				pageTitle = translations.rideBoard;
	  				addRideBtn = true;
	  				break;
	  			case 'app.ridechat':
	  				pageTitle = translations.chat;
	  				break;
	  			case 'app.addride':
	  				pageTitle = translations.addRide;
	  				break;
	  		}
	  		$scope.pagetitle = pageTitle;
	  		$scope.addridebtn = addRideBtn;
		});
  		
  });
