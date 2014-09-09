/*global Backbone */
var Forecast = (function() { 'use strict';

  var Location = require('./location');

  return Backbone.Model.extend({

    defaults: {
      apparel: false,
      currently: false,
      temperature: false
    },

    url: function() {
      // DEV
      // API from OpenWeatherMap :)
      return 'http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&APPID=b61a972176062e8cb65572109884d904';
      // return '/data/data-toronto.json';
    },

    parse: function(response, options) {
      // Adding the rounded temperature to the model data
      response.temperature =  Math.round(response.main.temp);
      // Returning the parse data
      return response;
    },

    initialize: function() {
      var self = this;
      // Getting the user's location (currently disabled)
      var location = new Location();
      // Fetching data from the API
      self.fetch({
        dataType: 'jsonp',
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