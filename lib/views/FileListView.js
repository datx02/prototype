module.exports = (function() {

  var FileModel = require("../models/File"),
      FileView = require("./FileView");

  // TODO: this view should actually be coupled with a
  // Backbone Collection.
  return Backbone.View.extend({

    initialize: function() {

    },

    renderAll: function(records) {
      this.$el.html("");
      if(records) {
        records.forEach(this.addOne.bind(this));
      }
    },

    addOne: function(record) {
      var file = new FileModel(record);
      var view = new FileView({model: file});
      this.$el.prepend(view.render().el);
    },

    render: function(file) {
      if(file === undefined) {
        this.$el.html("");
        App.rymdNode.store.getResources().then(function(resources) {
          console.log('resources', resources);
          for (var item in resources) {
            this.addOne(item);
          }
        });
      }
      else {
        this.addOne(file);
      }

      return this;
    }
  });
})();
