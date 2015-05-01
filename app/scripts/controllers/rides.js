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

angular.module('busnetApp.rides', ['busnetApp.grandfather', 'angularjs-dropdown-multiselect'])
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
	      	},
	      	areas: function($http){
	      		return $http.post('http://localhost:3002/rest/areas').then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.area};
	      			});
	      		});
	      	},
	      	vehicles: function($http){
	      		return $http.post('http://localhost:3002/rest/vehicles').then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	},
	      	translations: function($translate){
	      		return $translate([
	      			'CHECK_ALL',
	      			'UNCHECK_ALL', 
	      			'SELECTION_COUNT', 
	      			'SEARCH', 
	      			'SELECT', 
	      			'AREAS',
	      			'VEHICLE_TYPE']).then(function (translations) {
					return {
						checkAll: translations.CHECK_ALL,
						uncheckAll: translations.UNCHECK_ALL,
						selectionCount: translations.SELECTION_COUNT,
						searchPlaceholder: translations.SEARCH,
						buttonDefaultText: translations.SELECT,
						dynamicButtonTextSuffix: translations.SELECTION_COUNT,
						areas: translations.AREAS,
						vehicleType: translations.VEHICLE_TYPE
					}
				});
	      	}
	      }
	    });
	})
  .controller('RidesCtrl', function ($scope, $http, rides, areas, vehicles, translations) {
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
  	$scope.filterRides = filterRides;
  	$scope.rides = rides.data;
  	
  	$scope.areas = areas;
  	$scope.selectedAreas = [];
  	var areaTranslation = _.clone(translations);
  	areaTranslation.buttonDefaultText = areaTranslation.buttonDefaultText + ' ' + areaTranslation.areas
  	$scope.areaTranslation = areaTranslation;

  	
  	$scope.vehicles = vehicles;
  	$scope.selectedVehicles = [];
  	var vehiclesTranslation = _.clone(translations);
  	vehiclesTranslation.buttonDefaultText = vehiclesTranslation.buttonDefaultText + ' ' + areaTranslation.vehicleType
  	$scope.vehiclesTranslation = vehiclesTranslation;

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
