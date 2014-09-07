var Forecast = (function() { 'use strict';

  var Location = require('./location');

  return Backbone.Model.extend({

    initialize: function() {
      var location = new Location();
      console.log(location);
    }

  });

})();

module.exports = Forecast;