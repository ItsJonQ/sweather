/*global Backbone */
var Forecast = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      apparel: false,
      currently: false,
      temperature: false,
      image: false
    },

    url: function() {
      console.log('Sweather is hitting up da clouds for some weather!');
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
 * Jacket (Light)   :   11C or below
 * Sweater          :   17C or below
 */

    calcSweather: function() {
      var temperature = this.get('temperature');

      if(temperature <= 11) {
        this.set('apparel', 'light jacket');
        this.set('image', 'jacket-light');
      }
      else if(temperature <= 17) {
        this.set('apparel', 'sweather');
        this.set('image', 'sweather');
      }
      else {
        this.set('apparel', 'shirt');
        this.set('image', 'shirt');
      }
    }

  });

})();

module.exports = Forecast;