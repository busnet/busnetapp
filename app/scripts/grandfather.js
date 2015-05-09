'use strict';

angular.module('busnetApp.grandfather', ['ui.router'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        'login': function (loginService, $q, $http) {
          var roleDefined = $q.defer();

          /**
           * In case there is a pendingStateChange means the user requested a $state,
           * but we don't know yet user's userRole.
           *
           * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
           */
          if (loginService.pendingStateChange) {
            return loginService.resolvePendingState($http.get('http://localhost:3002/rest/user'));
          } else {
            roleDefined.resolve();
            console.log(loginService);
          }
          return roleDefined.promise;
        }
      }
    });
});
