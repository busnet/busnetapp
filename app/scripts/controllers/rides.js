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
	'angularjs-dropdown-multiselect',
	'ui.bootstrap',
	'ui.grid',
	'ui.grid.expandable',
	'busnetApp.RideChat',
  'infinite-scroll'])
	.config(function ($stateProvider, REST_URLS) {
	  $stateProvider
	    .state('app.rides', {
	      url: '/rides',
	      templateUrl: 'views/rides.html',
	      controller: 'RidesCtrl',
	      accessLevel: accessLevels.user,
	      resolve: {
	      	/*rides: function($http){
	      		return getRides(REST_URLS, $http);
	      	},*/
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
	      				return {id: item.name, label: item.name, _id: item._id};
	      			});
	      		});
	      	},
	      	ridetypes: function($http){
	      		return $http.post(REST_URLS.RIDE_TYPES).then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	}
	      }
	    });
	})
  .controller('RidesCtrl', function (
  	$scope, 
  	$http,
    $state,
  	rides,
  	ridetypes,
  	areas, 
  	vehicles, 
  	translations,
  	REST_URLS) {

    var ridesList = new rides();
    ridesList.setMapHandler(function(item){
      var typeName = item.type == "1" ? ridetypes[0].label : ridetypes[1].label;
      var vehicle = _.find(vehicles, {label: item.vehicleType});
      var typeImg = "images/vehicles/vehicle-" + vehicle._id +".png";
      var isSubContractor = item.type == "2" ? true : false;
      var formatedItem = {
        typeName: typeName,
        typeImg: typeImg,
        isSubContractor: isSubContractor
      }
      _.assign(formatedItem, item);
      return formatedItem;  
    });
    var filterRides = function(){
      var filter = {};
      if($scope.ride.date){
        filter.aviliableDateObj = $scope.ride.date;
      }
      filter.selectedVehicles = $scope.selectedVehicles;
      filter.selectedAreas = $scope.selectedAreas;
      ridesList.setFilter(filter);
    }
    $scope.ride = {};
    $scope.rides = ridesList;
  	$scope.ridetypes = ridetypes;
  	$scope.areas = areas;
  	$scope.selectedAreas = [];
  	
    $scope.gotoRide = function(rideId){
      $state.go('app.ridedetails', {rideId: rideId});
    }

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
