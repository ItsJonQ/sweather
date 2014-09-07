(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Application = require('./views/application');

new Application();
},{"./views/application":4}],2:[function(require,module,exports){
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
        self.get('currently').apparentTemperature = self.toCelsius(currently.apparentTemperature);
        self.get('currently').temperature = self.toCelsius(currently.temperature);
      }
      return self;
    }

  });

})();

module.exports = Forecast;
},{"./location":3}],3:[function(require,module,exports){
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

        navigator.geolocation.getCurrentPosition(function(position) {
          self.set('latitude', position.coords.latitude);
          self.set('longitude', position.coords.longitude);
        });

      } else {
        return false;
      }

    }
  });

})();

module.exports = Location;
},{}],4:[function(require,module,exports){
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
    }

  });

})();

module.exports = Application;
},{"../models/forecast":2,"./forecast":5,"./loader":6}],5:[function(require,module,exports){
/*global Backbone, _, jQuery */
var Forecast = (function() { 'use strict';

  return Backbone.View.extend({

    el: '#apparel',

    template: _.template($('#template-forecast').html()),

    initialize: function(options) {
      this.application = options.application;
      this.model.on('change', this.render, this);

      this.$title = this.$el.find('#apparel-title');
    },

    render: function() {
      this.application.renderLoadComplete();

      this.$el.hide();
      this.$el.html(this.template());
      this.$graphic = this.$el.find('#apparel-graphic');
      this.$title = this.$el.find('#apparel-title');

      if(this.model.get('sweater')) {
        this.$graphic.addClass('sweater');
        this.$title.text('Sweater Weather');
      } else {
        this.$graphic.addClass('shirt');
        this.$title.text('Shirt Weather');
      }

      this.$el.fadeIn('slow');

      return this;
    }

  });

})();

module.exports = Forecast;
},{}],6:[function(require,module,exports){
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
},{}]},{},[1]);
