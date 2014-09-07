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