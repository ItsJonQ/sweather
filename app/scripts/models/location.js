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

        // navigator.geolocation.getCurrentPosition(function(position) {
        //   self.set('latitude', position.coords.latitude);
        //   self.set('longitude', position.coords.longitude);
        // });

        this.set('latitude', true);
        this.set('longitude', true);

      } else {
        return false;
      }

    }
  });

})();

module.exports = Location;