module.exports = (function() {

  var ListView = require("./FileListView"),
      FileModel = require("../models/File"),
      FileView = require("./FileView");

  return ListView.extend({

    initialize: function() {
      // Call super #initialize()
      ListView.prototype.initialize.apply(this, arguments);
      this.collection.on('add', this.addOne.bind(this));

      App.rymdNode.on('share', function(peer, data, connection) {
        this.collection.add({ id: data.metadata.id, metadata: data.metadata });
      }.bind(this));
    },

    addOne: function(record) {
      var file = record instanceof FileModel ? record : new FileModel(record);
      var view = new FileView({model: file});

      this.$el.prepend(view.render().el);
    }
  });
})();
