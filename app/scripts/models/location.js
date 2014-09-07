/*global Backbone */
var Location = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      'latitude': null,
      'longitude': null
    },

    initialize: function() {
      var self = this;

      if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('latitude', position.coords.latitude);
          self.set('longitude', position.coords.longitude);
        });

      } else {
        return false;
      }

    }
  });

})();

module.exports = Location;