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
	'ui.bootstrap.showErrors',
	'ui.bootstrap',
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
  .controller('AddRideCtrl',function ($scope, $http, ridetypes, vehicles, REST_URLS) {
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
  		console.log(ride);
  		$http.post(REST_URLS.RIDE, ride).then(function(res){

  		});
  	}
  });
