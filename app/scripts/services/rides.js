'use strict';

/**
 * @ngdoc service
 * @name busnetApp.rides
 * @description
 * # rides
 * Factory in the busnetApp.
 */
angular.module('busnetApp')
  .factory('rides', function ($http, REST_URLS) {
    var rides = function(){
      this.items = [];
      this.busy = false;
      this.filter = { page: 1 };
      this.mapHandler = function(item){return item;};
    };

    rides.prototype.nextPage = function(){
      if(this.busy) return;
      this.busy = true;

      $http.post(REST_URLS.RIDES, this.filter).success(function(data){
        if(data){
          this.items = this.items.concat(_.map(data, this.mapHandler));
          this.filter.page++;
          this.busy = false;
        }
      }.bind(this));
    };

    rides.prototype.setFilter = function(filter){
      _.assign(this.filter, filter);
      this.reset();
    }

    rides.prototype.reset = function(){
      this.filter.page = 1;
      this.items = [];
      this.nextPage();
    }

    rides.prototype.setMapHandler = function(handler){
      this.mapHandler = handler;
    }

    return rides;
  });
