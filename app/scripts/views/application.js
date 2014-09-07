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