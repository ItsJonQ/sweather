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