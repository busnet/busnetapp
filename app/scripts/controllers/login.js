'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.login', ['busnetApp.grandfather', 'loginService'])
  .constant('LOGIN_SERVER_URL', 'http://localhost:3002/rest/login')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        accessLevel: accessLevels.public
      });
  })
  .controller('LoginCtrl', function (
    $scope, 
    $stateParams, 
    loginService, 
    $http, 
    $timeout,
    $state, 
    LOGIN_SERVER_URL) {
    // loginService exposed and a new Object containing login user/pwd
    $scope.ls = loginService;
    $scope.login = {
      working: false,
      wrong: false
    };
    $scope.loginMe = function () {
      // setup promise, and 'working' flag
      var loginPromise = $http.post(LOGIN_SERVER_URL, $scope.login);
      $scope.login.working = true;
      $scope.login.wrong = false;

      loginService.loginUser(loginPromise);
      loginPromise.error(function () {
        $scope.login.wrong = true;
        $timeout(function () { $scope.login.wrong = false; }, 8000);
      });
      loginPromise.finally(function () {
        $scope.login.working = false;
        $state.go('app.rides');
      });
    };
    $scope.logoutMe = function () {
      loginService.logoutUser();
    };
  });
