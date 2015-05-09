'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:RidesCtrl
 * @description
 * # RidesCtrl
 * Controller of the busnetApp
 */

var getRides = function(config, $http, filter){
	return $http.post(config.RIDES, filter);
};

angular.module('busnetApp.rides', [
	'busnetApp.grandfather', 
	'angularjs-dropdown-multiselect',
	'ui.bootstrap',
	'ui.grid',
	'ui.grid.expandable'])
	.config(function ($stateProvider, REST_URLS) {
	  $stateProvider
	    .state('app.rides', {
	      url: '/rides',
	      templateUrl: 'views/rides.html',
	      controller: 'RidesCtrl',
	      accessLevel: accessLevels.user,
	      resolve: {
	      	rides: function($http){
	      		return getRides(REST_URLS, $http);
	      	},
	      	areas: function($http){
	      		return $http.post(REST_URLS.AREAS).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.area};
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
	      	ridetypes: function($http){
	      		return $http.post(REST_URLS.RIDE_TYPES).then(function(res){
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
	      			'VEHICLE_TYPE',
	      			'NUM',
	      			'DATE',
	      			'VACATE',
	      			'BACK']).then(function (translations) {
					return {
						checkAll: translations.CHECK_ALL,
						uncheckAll: translations.UNCHECK_ALL,
						selectionCount: translations.SELECTION_COUNT,
						searchPlaceholder: translations.SEARCH,
						buttonDefaultText: translations.SELECT,
						dynamicButtonTextSuffix: translations.SELECTION_COUNT,
						areas: translations.AREAS,
						vehicleType: translations.VEHICLE_TYPE,
						num: translations.NUM,
						date: translations.DATE,
						vacate: translations.VACATE,
						back: translations.BACK
					}
				});
	      	}
	      }
	    });
	})
  .controller('RidesCtrl', function (
  	$scope, 
  	$http, 
  	rides,
  	ridetypes,
  	areas, 
  	vehicles, 
  	translations,
  	REST_URLS) {
  	var filterRides = function(){
  		var filter = {};
  		if($scope.ride.date){
  			filter.aviliableDateObj = $scope.ride.date;
  		}
  		filter.selectedVehicles = $scope.selectedVehicles;
  		filter.selectedAreas = $scope.selectedAreas;
  		getRides(REST_URLS, $http, filter).then(function(res){
  			$scope.gridOptions.data = res.data;
  		});
  	}
  	$scope.ridetypes = ridetypes;
  	console.log($scope.ridetypes)
  	$scope.ride = {};
  	$scope.gridOptions = {
  		data: rides.data,
  		columnDefs:[
  			{name: "id", field:"_id", displayName:translations.num},
  			{name: "aviliableDate", field:"aviliableDate", displayName:translations.date},
  			{name: "vacate", field:"area", displayName:translations.vacate},
  			{name: "back", field:"destination", displayName:translations.back},
  		],
  		expandableRowTemplate: "views/ride-details.html",
  		expandableRowHeight: 150,
  		enableRowSelection: true,
  		expandableRowScope: {ridetypes: ridetypes}
  	};
  	
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

  	$scope.filterEvents = {
  		onItemSelect: filterRides,
  		onItemDeselect: filterRides,
  		onSelectAll: filterRides,
  		onUnselectAll: filterRides,
  	};

  	$scope.date_opened = false;
  	$scope.date_toggle = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.date_opened = !$scope.date_opened;
	};
	$scope.date_change = function(){
  		filterRides();
  	};
});
