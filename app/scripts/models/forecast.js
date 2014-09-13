/*global Backbone */
var Forecast = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      apparel: false,
      currently: false,
      temperature: false
    },

    url: function() {
      console.log('Sweather is hitting up da cloud for weather!');
      var location = this.get('location');
      // DEV
      // API from OpenWeatherMap :)
      var data = 'http://api.openweathermap.org/data/2.5/weather?lat='+location.get('lat')+'&lon='+location.get('lon')+'&units=metric&APPID=b61a972176062e8cb65572109884d904';
      // data = '/data/data-toronto.json';
      return data;
    },

    parse: function(response, options) {
      // Adding the rounded temperature to the model data
      response.temperature =  Math.round(response.main.temp);

      // Returning the parse data
      return response;
    },

    initialize: function() {
      var self = this;
      // Fetching data from the API
      self.fetch({
        success: function() {
          // Calculating the apparel suggestion
          self.calcSweather();
        }
      });
    },

/**
 * Calculating SWEATHER (More coming soon)
 * --------------------
 * Sweater  : 17C or below
 */

    calcSweather: function() {
      if(this.get('temperature') <= 17) {
        this.set('apparel', 'sweater');
      } else {
        this.set('apparel', 'shirt');
      }
    }

  });

})();

module.exports = Forecast;