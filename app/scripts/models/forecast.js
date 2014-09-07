/*global Sweather, Backbone*/

Sweather.Models = Sweather.Models || {};

(function () {
    'use strict';

    Sweather.Models.Forecast = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
