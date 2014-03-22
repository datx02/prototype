module.exports = (function() {

  var Resource = require("../models/File"),
      ResourceStore = require("../Backbone.ResourceStore");

  return Backbone.Collection.extend({

    model: Resource,

    initialize: function() {
      // 'data' refers to the IndexedDB data store created in app.js
      this.resourceStore = new ResourceStore(App.rymdNode.store);
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
