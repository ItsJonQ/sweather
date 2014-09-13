!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=function(){"use strict";return Backbone.Collection.extend({localStorage:new Store("Sweather"),initialize:function(){console.log("Sweather localStorage initialized!")}})}();b.exports=c},{}],2:[function(a){"use strict";var b=a("./views/application");new b},{"./views/application":5}],3:[function(a,b){var c=function(){"use strict";return Backbone.Model.extend({defaults:{apparel:!1,currently:!1,temperature:!1,image:!1},url:function(){console.log("Sweather is hitting up da clouds for some weather!");var a=this.get("location"),b="http://api.openweathermap.org/data/2.5/weather?lat="+a.get("lat")+"&lon="+a.get("lon")+"&units=metric&APPID=b61a972176062e8cb65572109884d904";return b},parse:function(a){return a.temperature=Math.round(a.main.temp),a},initialize:function(){var a=this;a.fetch({success:function(){a.calcSweather()}})},calcSweather:function(){var a=this.get("temperature");11>=a?(this.set("apparel","light jacket"),this.set("image","jacket-light")):17>=a?(this.set("apparel","sweather"),this.set("image","sweater")):(this.set("apparel","shirt"),this.set("image","shirt"))}})}();b.exports=c},{}],4:[function(a,b){var c=function(){"use strict";return Backbone.Model.extend({defaults:{lat:null,lon:null,locate:!0,status:!1},locate:function(){var a=this;return a.get("locate")&&"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(function(b){a.set("lat",b.coords.latitude),a.set("lon",b.coords.longitude),a.set("status",!0)}),!0},updated:function(){var a=this;setTimeout(function(){return a.set("status","ok"),a.trigger("status:changed"),a},10)}})}();b.exports=c},{}],5:[function(a,b){var c=function(){"use strict";var b=a("../models/forecast"),c=a("../models/location"),d=a("./forecast"),e=a("./loader"),f=a("../collections/application");return Backbone.View.extend({el:"#application",className:"sweather-application",cached:!1,localData:!1,location:new c,initialize:function(){var a=this;console.log("Sweather initialized."),a.loader=new e,a.collection=new f({model:c}),a.localData?a.collection.fetch({success:function(b){if(b.length){a.cached=!0;var d=b.first();d.set("locate",!1),a.location=new c(d.attributes),a.location.updated()}else a.location.locate()}}):a.location.locate(),a.location.on("change:status",function(){!a.cached&&a.localData&&a.collection.create(a.location),a.forecast=new b({location:a.location}),a.forecastView=new d({application:a,model:a.forecast})})},render:function(){},renderLoadComplete:function(){this.loader.renderCompleted()},renderCoolish:function(){$("html").addClass("coolish")},renderWarmish:function(){$("html").addClass("warmish")}})}();b.exports=c},{"../collections/application":1,"../models/forecast":3,"../models/location":4,"./forecast":6,"./loader":7}],6:[function(a,b){var c=function(){"use strict";return Backbone.View.extend({el:"#apparel",template:_.template($("#template-forecast").html()),initialize:function(a){this.application=a.application,this.model.on("change:image",this.render,this)},render:function(){var a=this;return a.application.renderLoadComplete(),a.$el.hide(),a.$el.html(a.template(a.model.attributes)),a.$el.fadeIn("slow",function(){"shirt"===a.model.get("apparel")?a.application.renderWarmish():a.application.renderCoolish()}),this}})}();b.exports=c},{}],7:[function(a,b){var c=function(){"use strict";return Backbone.View.extend({el:"#loading",template:_.template($("#template-loader").html()),initialize:function(){this.render()},render:function(){return this.$el.html(this.template()),this},renderCompleted:function(){this.$el.fadeOut()}})}();b.exports=c},{}]},{},[2]);