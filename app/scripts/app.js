'use strict';

/**
 * @ngdoc overview
 * @name busnetApp
 * @description
 * # busnetApp
 *
 * Main module of the application.
 */
angular
  .module('busnetApp', [
    'loginService',
    //app sections
    'busnetApp.error',
    'busnetApp.home',
    'busnetApp.about',
    'busnetApp.login',
    'busnetApp.rides',
    // components
    'busnetApp.directives',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate'
  ])
  .config(function ($urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/');
    $translateProvider.useStaticFilesLoader({
      prefix: '/languages/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('he');
  })
  .run(function($rootScope){
    var resolveDone = function () { $rootScope.doingResolve = false; };
    $rootScope.doingResolve = false;

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.doingResolve = true;
    });
    $rootScope.$on('$stateChangeSuccess', resolveDone);
    $rootScope.$on('$stateChangeError', resolveDone);
    $rootScope.$on('$statePermissionError', resolveDone);
  });
