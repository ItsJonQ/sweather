(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global Backbone, Store */
var Application = (function() { 'use strict';

  return Backbone.Collection.extend({

    localStorage: new Store('Sweather'),

    initialize: function() {
      console.log('Sweather localStorage initialized!');
    }
  });

})();

module.exports = Application;
},{}],2:[function(require,module,exports){
'use strict';

var Application = require('./views/application');

new Application();
},{"./views/application":5}],3:[function(require,module,exports){
/*global Backbone */
var Forecast = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      apparel: false,
      currently: false,
      temperature: false
    },

    url: function() {
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
},{}],4:[function(require,module,exports){
/*global Backbone */
var Location = (function() { 'use strict';

  return Backbone.Model.extend({

    defaults: {
      'lat': null,
      'lon': null,
      'locate': true,
      'status': false
    },

    initialize: function() {
    },

    locate: function() {
      var self = this;

      if (self.get('locate') && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('lat', position.coords.latitude);
          self.set('lon', position.coords.longitude);
          self.set('status', true);
        });
      }

      return true;
    },

    updated: function() {
      var self = this;
      // Not sure why setTimeout is required.. but it's the only way it'll work.
      // for now..
      setTimeout(function() {
        self.set('status', 'ok');
        self.trigger('status:changed');
        return self;
      }, 10);
    }
  });

})();

module.exports = Location;
},{}],5:[function(require,module,exports){
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

    location: new Location(),

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
            var savedModel = data.first();
            savedModel.set('locate', false);
            self.location = new Location(savedModel.attributes);
            self.location.updated();
            // self.location.locate();
          } else {
            self.location.locate();
          }
          console.log(self.location);
        }
      });

      // Once the location is set
      self.location.on('change', function() {
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
},{"../collections/application":1,"../models/forecast":3,"../models/location":4,"./forecast":6,"./loader":7}],6:[function(require,module,exports){
/*global Backbone, _, jQuery */
var Forecast = (function() { 'use strict';

  return Backbone.View.extend({

    el: '#apparel',

    template: _.template($('#template-forecast').html()),

    initialize: function(options) {
      // Assigning the application.view to this view
      this.application = options.application;
      // Render when model.apparel is set
      this.model.on('change:apparel', this.render, this);
    },

    render: function() {
      var self = this;
      // Remove the loading state
      self.application.renderLoadComplete();
      // Hide the element for animation
      self.$el.hide();
      // Render the template into the DOM
      self.$el.html(self.template(self.model.attributes));
      // Fade the template into view
      self.$el.fadeIn('slow', function() {
        // Adjust the background colour after animating the apparel
        if(self.model.get('sweater')) {
          self.application.renderCoolish();
        } else {
          self.application.renderWarmish();
        }
      });

      return this;
    }

  });

})();

module.exports = Forecast;
},{}],7:[function(require,module,exports){
/*global Backbone, _, jQuery */
var loader = (function() { 'use strict';

  return Backbone.View.extend({

    el: '#loading',

    template: _.template($('#template-loader').html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    renderCompleted: function() {
      this.$el.fadeOut();
    }

  });

})();

module.exports = loader;
},{}]},{},[2]);
