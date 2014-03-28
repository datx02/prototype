module.exports = (function() {

  var ListView = require("./FileListView");

  return ListView.extend({

    initialize: function() {
      // Call super #initialize()
      ListView.prototype.initialize.apply(this, arguments);

      this.collection.on('add', this.addOne.bind(this));
    }
  });
})();
