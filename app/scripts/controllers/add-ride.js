'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:AddRideCtrl
 * @description
 * # AddRideCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.addride', [
	'busnetApp.grandfather',
	'ui.bootstrap',
	'ui.bootstrap.showErrors',
	'ui.bootstrap.modal',
	'config'])
	.config(function ($stateProvider, REST_URLS) {
	  $stateProvider
	    .state('app.addride', {
	      url: '/addride',
	      templateUrl: 'views/add-ride.html',
	      controller: 'AddRideCtrl',
	      accessLevel: accessLevels.user,
	      resolve:{
	      	ridetypes: function($http){
	      		return $http.post(REST_URLS.RIDE_TYPES).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	},
	      	vehicles: function($http){
	      		return $http.post(REST_URLS.VEHICLES).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item.name, label: item.name};
	      			});
	      		});
	      	},
	      }
	    });	
	})
  .controller('AddRideCtrl',function ($scope, $http, $state, $modal, ridetypes, vehicles, REST_URLS) {
    /*---------------------new variables added by Alex-------------------------------------------------------------*/
    $scope.today = new Date();
    /*-----------------------------------------------------------------------------------------------*/
    $scope.ridetypes = ridetypes;
    $scope.vehicles = vehicles;
    $scope.vehicleCount = ['1', '2', '3', '4','5+'];

  	$scope.vacant_date_opened = false;
  	$scope.toggle_vacant_date = function($event){
  		$event.preventDefault();
		$event.stopPropagation();
		
		$scope.vacant_date_opened = !$scope.vacant_date_opened;
  	}

  	$scope.return_date_opened = false;
  	$scope.toggle_return_date = function($event){
  		$event.preventDefault();
		$event.stopPropagation();
		
		$scope.return_date_opened = !$scope.return_date_opened;
  	}

  	$('.typeahead').typeahead({
  		ajax: {
  			url: REST_URLS.CITIES,
  			method: 'post',
  			displayField: 'city',
  			valueField: '_id'
  		}
  	});	

  	$scope.save = function(ride){
  		$scope.$broadcast('show-errors-check-validity');
  		if(!$scope.addride.$valid){
  			return;
  		}
  		$http.post(REST_URLS.RIDE, ride).then(function(res){
  			var modalInstance = $modal.open({
				animation: true,
				templateUrl: 'views/add-ride-modal.html',
				controller: 'AddRideModalCtrl',
				size: 'sm',
				resolve: {
					ride: function () {
					  return res.data;
					}
				}
			});

			modalInstance.result.then(function (response) {
				if(response){
					$state.go("app.rides");
				}
			}, function () {
				console.log('Modal dismissed at: ' + new Date());
			});
  		});
  	}
  });
