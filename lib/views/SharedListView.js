module.exports = (function() {

  var ListView = require("./FileListView");

  return ListView.extend({

    initialize: function() {
      // Call super #initialize()
      ListView.prototype.initialize.apply(this, arguments);

      this.collection.on('add', this.addOne.bind(this));

      App.rymdNode.on('share', function(peer, data, connection) {
        this.collection.add({ id: data.metadata.id, metadata: data.metadata });
      }.bind(this));
    }
  });
})();
