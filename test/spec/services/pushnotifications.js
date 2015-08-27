'use strict';

describe('Service: pushNotifications', function () {

  // load the service's module
  beforeEach(module('busnetApp'));

  // instantiate service
  var pushNotifications;
  beforeEach(inject(function (_pushNotifications_) {
    pushNotifications = _pushNotifications_;
  }));

  it('should do something', function () {
    expect(!!pushNotifications).toBe(true);
  });

});
