/*global Backbone, _, jQuery */
var Application = (function() { 'use strict';

  // Requiring modules
  // Models
  var Forecast = require('../models/forecast');
  var Location = require('../models/location');
  // Views
  var ForecastView = require('./forecast');
  var LoaderView = require('./loader');

  return Backbone.View.extend({

    el: '#application',

    className: 'sweather-application',

    initialize: function() {
      var self = this;
      console.log('Sweather initialized.');
      // Enter loading state
      self.loader = new LoaderView();

      // Getting the user's location (currently disabled)
      self.location = new Location();
      // Once the location is set
      self.location.on('change:status', function() {
        // Create a new Forecast, passing the location
        self.forecast = new Forecast({
          location: self.location
        });
        // Create/render the Forecast view
        self.forecastView = new ForecastView({
          application: self,
          model: self.forecast
        });
      });

    },

    render: function() {

    },

    renderLoadComplete: function() {
      this.loader.renderCompleted();
    },

    renderCoolish: function() {
      $('html').addClass('coolish');
    },

    renderWarmish: function() {
      $('html').addClass('warmish');
    }

  });

})();

module.exports = Application;