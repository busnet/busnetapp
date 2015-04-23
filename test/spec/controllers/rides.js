'use strict';

describe('Controller: RidesCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var RidesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RidesCtrl = $controller('RidesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
