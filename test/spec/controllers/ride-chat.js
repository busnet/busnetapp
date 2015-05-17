'use strict';

describe('Controller: RideChatCtrl', function () {

  // load the controller's module
  beforeEach(module('busnetApp'));

  var RideChatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RideChatCtrl = $controller('RideChatCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
