module.exports = (function() {

  var FileModel = require("../models/File"),
      FileView = require("./FileView");

  return Backbone.View.extend({

    initialize: function() {
      // Listen to collection events and re-render
      this.collection.on('create', this.addOne.bind(this));
      this.collection.on('reset', this.render.bind(this));
    },

    addOne: function(record) {
      var file = record instanceof FileModel ? record : new FileModel(record);
      var view = new FileView({model: file});

      this.$el.prepend(view.render().el);
    },

    render: function() {
      this.collection.each(this.addOne.bind(this));
      return this;
    }
  });
})();
