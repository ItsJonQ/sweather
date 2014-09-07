(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Application = require('./views/application');

new Application();
},{"./views/application":2}],2:[function(require,module,exports){
/*global Backbone, _, jQuery */
var Application = (function() { 'use strict';

  var Loader = require('./loader');

  return Backbone.View.extend({

    el: '#application',

    className: 'sweather-application',

    initialize: function() {
      console.log('Sweather initialized.');
      // Enter loading state
      this.loader = new Loader();

    },

    render: function() {

    }

  });

})();

module.exports = Application;
},{"./loader":3}],3:[function(require,module,exports){
/*global Backbone, _, jQuery */
var loader = (function() { 'use strict';

  return Backbone.View.extend({

    el: '#application',

    template: _.template($('#template-loader').html()),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

})();

module.exports = loader;
},{}]},{},[1]);
