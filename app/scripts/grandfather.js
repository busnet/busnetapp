'use strict';

angular.module('busnetApp.grandfather', ['ui.router'  ])
.config(function ($stateProvider, $windowProvider) {
  var window = $windowProvider.$get();
  var display = {
    iphone6: window.matchMedia('only screen and (min-device-width : 375px) and (max-device-width : 667px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 2)').matches,
    iphone6plus: window.matchMedia('only screen and (min-device-width : 414px) and (max-device-width : 736px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio : 3) ').matches
  };
  var size = display.iphone6 ? 'small' :
      display.iphone6plus ? 'large' : 'medium'; 
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: 'views/body.html',
      controller: 'BodyCtrl',
      resolve: {
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
                'BACK',
                'RIDE_BOARD',
                'CHAT',
                'ADD_RIDE']).then(function (translations) {
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
              back: translations.BACK,
              rideBoard: translations.RIDE_BOARD,
              chat: translations.CHAT,
              addRide: translations.ADD_RIDE
            }
          });
        },
        'login': function (loginService, $q, $http, REST_URLS) {
          var roleDefined = $q.defer();

          /**
           * In case there is a pendingStateChange means the user requested a $state,
           * but we don't know yet user's userRole.
           *
           * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
           */
          if (loginService.pendingStateChange) {
            return loginService.resolvePendingState($http.get(REST_URLS.USER));
          } else {
            roleDefined.resolve();
          }
          return roleDefined.promise;
        }
      }
    });
});
