'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:AddRideCtrl
 * @description
 * # AddRideCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.addride', ['busnetApp.grandfather'])
	.config(function ($stateProvider) {
	  $stateProvider
	    .state('app.addride', {
	      url: '/addride',
	      templateUrl: 'views/add-ride.html',
	      controller: 'AddRideCtrl',
	      accessLevel: accessLevels.user,
	      resolve:{
	      	ridetypes: function($http){
	      		return $http.post('http://localhost:3002/rest/ridetypes').then(function(res){
	      			console.log(res);
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	},
	      	vehicles: function($http){
	      		return $http.post('http://localhost:3002/rest/vehicles').then(function(res){
	      			return _.map(res.data, function(item){
	      				return {id: item.name, label: item.name};
	      			});
	      		});
	      	},
	      }
	    });	
	})
  .controller('AddRideCtrl', function ($scope, ridetypes, vehicles) {
    $scope.ridetypes = ridetypes;
    $scope.vehicles = vehicles;
    $scope.vehicleCount = ['1', '2', '3', '4','5+'];
  	$('.date').datetimepicker({
  		format: "DD/MM/YY"
  	});
  });
