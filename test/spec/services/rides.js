'use strict';

describe('Service: rides', function () {

  // load the service's module
  beforeEach(module('busnetApp'));

  // instantiate service
  var rides;
  beforeEach(inject(function (_rides_) {
    rides = _rides_;
  }));

  it('should do something', function () {
    expect(!!rides).toBe(true);
  });

});
