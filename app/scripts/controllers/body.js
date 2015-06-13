'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the busnetApp
 */

angular.module('busnetApp')
  	.controller('BodyCtrl', function ($scope, $state, translations, loginService) {
  	    $scope.isLogged = loginService.isLogged ? true : false;
  	    $scope.logoutMe = function () {
	      loginService.logoutUser();
	    };
  	    $scope.$on('$stateChangeSuccess',
		function (event, toState, toParams, fromState, fromParams) {
		    $scope.isLogged = loginService.isLogged ? true : false;

		    var pageTitle = '';
		    var addRideBtn = false;
		    switch ($state.current.name) {
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
                // new added by Alex
		        case 'app.settings':
		            pageTitle = translations.settings;
                    break;
                case 'app.company-details':
		            pageTitle = translations.companyDetails;
                    break;
		    }
		    $scope.pagetitle = pageTitle;
		    $scope.addridebtn = addRideBtn;
		});
  	});
