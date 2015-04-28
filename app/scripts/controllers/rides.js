'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RidesCtrl
 * @description
 * # RidesCtrl
 * Controller of the busnetApp
 */

var getRides = function($http, filter){
	return $http.post('http://localhost:3002/rest/rides', filter);
};

angular.module('busnetApp.rides', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.rides', {
	      url: '/rides',
	      templateUrl: 'views/rides.html',
	      controller: 'RidesCtrl',
	      accessLevel: accessLevels.user,
	      resolve: {
	      	rides: function($http){
	      		return getRides($http);
	      	}
	      }
	    });
	})
  .controller('RidesCtrl', function ($scope, $http, rides) {
  	var filterRides = function(){
  		var filter = {};
  		if($scope.rideDate){
  			filter.aviliableDateObj = $scope.rideDate;
  		}
  		if($scope.vehicleType){
  			filter.vehicleType = $scope.vehicleType;
  		}
  		getRides($http, filter).then(function(res){
  			$scope.rides = res.data;
  		});
  	}
  	$scope.rides = rides.data;
  	$scope.vehicles = [
  		'אוטובוס',
  		'מיניבוס',
  		'וואן',
  		'מיקרובוס',
  		'רכב להסעת נכים'
  	];
  	var dselector = $('#ride-date-selector');
  	dselector.datetimepicker({
  		format: "DD/MM/YY"
  	});
  	dselector.on('dp.change', function(element){
  		$scope.rideDate = element.date;
  		filterRides();
  	});

  	$scope.filterVehicle = function(vehicle){
  		$scope.vehicleType = vehicle;
  		filterRides();
  	};
});
