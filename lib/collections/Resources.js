module.exports = (function() {

  var Resource = require("../models/File"),
      ResourceStore = require("../Backbone.ResourceStore");

  return Backbone.Collection.extend({

    model: Resource,

    initialize: function(models, opts) {
      var opts = opts || {};
      opts.shared = opts.shared || false;
      // 'data' refers to the IndexedDB data store created in app.js
      this.resourceStore = new ResourceStore(App.rymdNode.store);

      // If this is a shared collection (i.e. incomplete),
      // separate them via overriden Collection#parse function.
      this.parse = function(response, options) {
        return response.filter(function(resource) {
          if(resource.hasData !== opts.shared) {
            return resource;
          }
        });
      }
    },

    // Override Backbone.Collection#create to trigger 'create'
    // on collection, when data is returned from persistant storage.
    create: function(attrs, options) {
      var create = Backbone.Collection.prototype.create;
      options = options || {};
      options.success = function(model, response) {
        this.trigger('create', model);
      }.bind(this);

      return create.call(this, attrs, options);
    },

    comparator: function(model) {
      return model.attributes.metadata.timestamp;
    }

  });
})();
