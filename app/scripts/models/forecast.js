/*global Backbone */
var Forecast = (function() { 'use strict';

  var Location = require('./location');

  return Backbone.Model.extend({

    defaults: {
      celsius: true,
      sweater: false,
      currently: false
    },

    url: function() {
      // DEV
      return '/data/data-toronto.json';
    },

    initialize: function() {
      var location = new Location();
      var self = this;

      self.fetch({
        success: function() {
          self.calcSweaterWeather();
        }
      });
    },

    calcSweaterWeather: function() {
      if(this.get('currently').temperature < 50 ) {
        this.set('sweater', true);
        this.set('apparel', 'sweater');
      } else {
        this.set('apparel', 'shirt');
      }
      return this.get('sweater');
    },

    calcCelsius: function(number) {
      if(!number || typeof number !== 'number') {
        return false;
      }
      return Math.round( (number - 32) * 5 / 9 );
    },

    toCelsius: function() {
      var self = this;
      if(self.get('celsius')) {
        var currently = self.get('currently');
        // self.get('currently').apparentTemperatureCelsius = self.toCelsius(currently.apparentTemperature);
        // self.get('currently').temperatureCelsius = self.toCelsius(currently.temperature);
        self.set('temperatureCelsius', self.calcCelsius(currently.temperature));
      }
      return self;
    }

  });

})();

module.exports = Forecast;