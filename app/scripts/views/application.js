/*global Backbone, _, jQuery */
var Application = (function() { 'use strict';

  // Requiring modules
  // Models
  var Forecast = require('../models/forecast');
  // Views
  var ForecastView = require('./forecast');
  var LoaderView = require('./loader');

  return Backbone.View.extend({

    el: '#application',

    className: 'sweather-application',

    initialize: function() {
      console.log('Sweather initialized.');
      // Enter loading state
      this.loader = new LoaderView();

      this.forecast = new Forecast();
      this.forecastView = new ForecastView({
        application: this,
        model: this.forecast
      });
    },

    render: function() {

    },

    renderLoadComplete: function() {
      this.loader.renderCompleted();
    },

    renderWarmish: function() {
      $('html').addClass('warmish');
    }

  });

})();

module.exports = Application;