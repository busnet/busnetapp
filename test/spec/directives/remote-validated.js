'use strict';

describe('Directive: remoteValidated', function () {

  // load the directive's module
  beforeEach(module('busnetApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remote-validated></remote-validated>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the remoteValidated directive');
  }));
});
