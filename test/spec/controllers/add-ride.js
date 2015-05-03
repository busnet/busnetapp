'use strict';

describe('Controller: AddRideCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var AddRideCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddRideCtrl = $controller('AddRideCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
