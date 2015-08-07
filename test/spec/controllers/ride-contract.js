'use strict';

describe('Controller: RideContractCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var RideContractCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RideContractCtrl = $controller('RideContractCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
