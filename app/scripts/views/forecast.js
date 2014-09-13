/*global Backbone, _, jQuery */
var Forecast = (function() { 'use strict';

  return Backbone.View.extend({

    el: '#apparel',

    template: _.template($('#template-forecast').html()),

    initialize: function(options) {
      // Assigning the application.view to this view
      this.application = options.application;
      // Render when model.apparel is set
      this.model.on('change:image', this.render, this);
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
        if(self.model.get('apparel') === 'shirt') {
          self.application.renderWarmish();
        } else {
          self.application.renderCoolish();
        }
      });

      return this;
    }

  });

})();

module.exports = Forecast;