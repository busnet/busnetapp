'use strict';

describe('Controller: MyRequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var MyRequestsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyRequestsCtrl = $controller('MyRequestsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
