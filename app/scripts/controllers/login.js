'use strict';

/**
 * @ngdoc function
 * @name busnetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the busnetApp
 */
angular.module('busnetApp.login', ['busnetApp.grandfather', 'loginService'])
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
    REST_URLS) {
    // loginService exposed and a new Object containing login user/pwd
    if(loginService.isLogged){
      $state.go('app.rides');
    }
    $scope.ls = loginService;
    
    $scope.login = {
      working: false,
      wrong: false,
      user: loginService.user,
      isLogged: loginService.isLogged ? true : false
    };
    $scope.loginMe = function () {
      // setup promise, and 'working' flag
      $scope.login.google = loginService.user.google;
      $scope.login.working = true;
      $scope.login.wrong = false;
      $scope.login.deviceToken = '';

      var loginPromise = $http.post(REST_URLS.LOGIN_SERVER, $scope.login);
      loginPromise.success(function(){
        $state.go('app.rides');
      });
      loginPromise.error(function () {
        $scope.login.wrong = true;
        $timeout(function () { $scope.login.wrong = false; }, 8000);
      });
      loginPromise.finally(function () {
        $scope.login.working = false;
      });
      loginService.loginUser(loginPromise);
    };
    $scope.logoutMe = function () {
      loginService.logoutUser();
    };
  });
