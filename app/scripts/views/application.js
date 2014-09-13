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

    // set to true to use localStorage
    localData: false,

    location: new Location(),

    initialize: function() {
      var self = this;
      console.log('Sweather initialized.');

      // Enter loading state
      self.loader = new LoaderView();

      self.collection = new AppCollection({
        model: Location
      });

      if(self.localData) {
        self.collection.fetch({
          success: function(data) {
            if(data.length) {
              self.cached = true;
              // Using the user's cached location
              var savedModel = data.first();
              savedModel.set('locate', false);
              self.location = new Location(savedModel.attributes);
              self.location.updated();
            } else {
              self.location.locate();
            }
          }
        });
      } else {
        self.location.locate();
      }

      // Once the location is set
      self.location.on('change', function() {
        // If the data isn't cached
        if(!self.cached && self.localData) {
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