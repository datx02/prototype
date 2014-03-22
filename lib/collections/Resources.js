module.exports = (function() {

  var Resource = require("../models/File"),
      ResourceStore = require("../Backbone.ResourceStore");

  return Backbone.Collection.extend({

    model: Resource,

    initialize: function() {
      // 'data' refers to the IndexedDB data store created in app.js
      this.resourceStore = new ResourceStore(App.rymdNode.store);
    },

    comparator: function(model) {
      return model.attributes.metadata.timestamp;
    }

  });
})();
