/*global Backbone */
var Location = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      'lat': null,
      'lon': null,
      'locate': true,
      'status': false
    },

    locate: function() {
      var self = this;

      if (self.get('locate') && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('lat', position.coords.latitude);
          self.set('lon', position.coords.longitude);
          self.set('status', true);
        });
      }

      return true;
    },

    updated: function() {
      var self = this;
      // Not sure why setTimeout is required.. but it's the only way it'll work.
      // for now..
      setTimeout(function() {
        self.set('status', 'ok');
        self.trigger('status:changed');
        return self;
      }, 10);
    }
  });

})();

module.exports = Location;