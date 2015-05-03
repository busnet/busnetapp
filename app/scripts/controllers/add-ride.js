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
	      			return _.map(res.data, function(item){
	      				return {id: item._id, label: item.name};
	      			});
	      		});
	      	}
	      }
	    });
	})
  .controller('AddRideCtrl', function ($scope, ridetypes) {
    $scope.ridetypes = ridetypes;
  });
