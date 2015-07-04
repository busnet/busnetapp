'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:BodyCtrl
 * @description
 * # BodyCtrl
 * Controller of the busnetApp
 */

angular.module('busnetApp')
  	.controller('BodyCtrl', function ($scope, $state, $http, translations, loginService, REST_URLS) {

  	    var socket = io(REST_URLS.SOCKET_SERVER);
  	    $scope.isLogged = loginService.isLogged ? true : false;
  	    $scope.logoutMe = function () {
	      loginService.logoutUser();
	    };

	    $scope.notifications = [];
	    $scope.notifications.count = null;
	    var notificationsCount = function(){
	    	$scope.notifications.count = $scope.notifications.length;
	    }
	    var getNotifications = function(){
	    	$http.get(REST_URLS.NOTIFICATIONS).
	    	success(function(res){
	    		if(res.data){
	    			$scope.notifications = res.data;
	    			notificationsCount();
	    		}
	    	});
	    };

	    socket.on('notify', function (data){
	    	getNotifications();
	    });
	    getNotifications();

  	    $scope.$on('$stateChangeSuccess',
		function (event, toState, toParams, fromState, fromParams) {
		    $scope.isLogged = loginService.isLogged ? true : false;

		    var pageTitle = '';
		    var addRideBtn = false;
		    var header = true;
		    var headButtons = true;
		    var footer = true;

		    switch ($state.current.name) {
		    	case 'app.login':
		    		header = false;
		    		footer = false;
		    		headButtons = false;
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
		    $scope.header = header;
		    $scope.headButtons = headButtons;
		    $scope.footer = footer;

		});
  	});
