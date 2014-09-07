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