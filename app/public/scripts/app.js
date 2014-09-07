(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Forecast = require('./models/forecast');

var forecast = new Forecast();

console.log(forecast);
},{"./models/forecast":2}],2:[function(require,module,exports){
/*global Backbone */
var Forecast = (function() { 'use strict';

  var Location = require('./location');

  return Backbone.Model.extend({

    defaults: {
      celsius: true
    },

    url: function() {
      // DEV
      return '/data/data-toronto.json';
    },

    initialize: function() {
      var location = new Location();
      this.fetch();
    },

    toCelcius: function(number) {
      if(!number || typeof number !== 'number') {
        return false;
      }
      return Math.round( (number - 32) * 5 / 9 );
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
},{}]},{},[1]);
