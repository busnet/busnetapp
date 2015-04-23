'use strict';

/**
 * @ngdoc directive
 * @name busnetApp.directive:passwordMatch
 * @description
 * # angularLogin.directives
 */
angular.module('busnetApp.directives', [])
	.directive('passwordMatch', function () {
	    return {
		    restrict: 'A',
		    scope: false,
		    require: 'ngModel',
		    link: function (scope, elem, attrs, controller) {
		      var checker = function () {
		        // get the value of the first password
		        var pwd = scope.$eval(attrs.ngModel);
		        // get the value of the other password
		        var pwd2 = scope.$eval(attrs.passwordMatch);
		        return pwd === pwd2;
		      };
		      scope.$watch(checker, function (pwdMatch) {
		        controller.$setValidity('match', pwdMatch);
		      });
		    }
  		};
	});
	
