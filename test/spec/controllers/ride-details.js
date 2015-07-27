'use strict';

describe('Controller: RideDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var RideDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RideDetailsCtrl = $controller('RideDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
