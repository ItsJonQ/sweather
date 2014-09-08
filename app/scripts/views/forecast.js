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
      var self = this;
      self.application.renderLoadComplete();
      self.$el.hide();

      self.model.toCelsius();

      self.$el.html(self.template(self.model.attributes));
      self.$graphic = self.$el.find('#apparel-graphic');
      self.$title = self.$el.find('#apparel-title');

      if(self.model.get('sweater')) {
        self.$graphic.addClass('sweater');
      } else {
        self.$graphic.addClass('shirt');
      }

      self.$el.fadeIn('slow', function() {
        self.application.renderWarmish();
      });

      return this;
    }

  });

})();

module.exports = Forecast;