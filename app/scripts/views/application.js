/*global Backbone, _, jQuery, Store */
var Application = (function() { 'use strict';

  // Requiring modules
  // Models
  var Forecast = require('../models/forecast');
  var Location = require('../models/location');
  // Views
  var ForecastView = require('./forecast');
  var LoaderView = require('./loader');
  // Collections
  var AppCollection = require('../collections/application');

  return Backbone.View.extend({

    el: '#application',

    className: 'sweather-application',

    cached: false,

    initialize: function() {
      var self = this;
      console.log('Sweather initialized.');

      // Enter loading state
      self.loader = new LoaderView();

      self.collection = new AppCollection({
        model: Location
      });

      self.collection.fetch({
        success: function(data) {
          if(data.length) {
            self.cached = true;
            // Using the user's cached location
            self.location = data.first();
            self.location.set('status', 'ok');
            console.log(self.location);
          } else {
            // Getting the user's location
            self.location = new Location();
          }
        }
      });

      // Once the location is set
      self.location.on('change:status', function() {
        // If the data isn't cached
        if(!self.cached) {
          // Save it to local storage
          self.collection.create(self.location);
        }
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