/*global Backbone */
var Location = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      'latitude': null,
      'longitude': null,
      'status': false
    },

    initialize: function() {
      var self = this;

      if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('lat', position.coords.latitude);
          self.set('lon', position.coords.longitude);

          self.set('status', true);

          return true;
        });
        // this.set('latitude', true);
        // this.set('longitude', true);

      } else {
        return false;
      }

    }
  });

})();

module.exports = Location;