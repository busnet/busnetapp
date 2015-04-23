'use strict';

/**
 * @ngdoc directive
 * @name busnetApp.directive:remoteValidated
 * @description
 * # remoteValidated
 */
angular.module('busnetApp.directives', [])
  .directive('remoteValidated', function () {
	  return {
	    restrict: 'A',
	    scope: false,
	    require: 'ngModel',
	    link: function (scope, elem, attrs, controller) {
	      var invalidItems = [];
	      scope.$watch(attrs.ngModel, function (newValue, oldValue) {
	        if (newValue) {
	          // Check the array of already-bad items
	          if (invalidItems.indexOf(newValue) !== -1) {
	            return controller.$setValidity(attrs.remoteValidated, false);
	          }
	          // When the model changes, it checks if the previous value was
	          // triggering the error from server-side
	          if (controller.$error[attrs.remoteValidated]) {
	            invalidItems.push(oldValue);
	          }
	          controller.$setValidity(attrs.remoteValidated, true);
	        }
	      });
	    }
	  };
	});
