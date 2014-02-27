module.exports = (function() {

  var FileModel = require("../models/File"),
    FileOptionView = require("./FileOptionView");

  // TODO should listen to uploadview

  return Backbone.View.extend({

    events: {
      'click .connect': 'connect',
      'click .send': 'sendFileToPeer'
    },

    initialize: function() {
      // get all files from store and render them in the sel list
      this.render();
    },

    connect: function() {
      var name = this.$el.find('.name').val();
      App.init(name);
      //var connection = this.connection = new App.Connection({ ondata: ondata, name: name, endpoint: { host: 'rymdjs.dev', port: 9000}, dht: 'http://localhost:3000' });

      //connection.connect(name);

      function ondata(data) {
        App.Store.create(data).then(function() {
          console.log('File added');
        });
      }
    },

    sendFileToPeer: function() {
      var peerName = this.$el.find('.to-peer').val();

      var selectedFile = this.$el.find('.files option:selected').data('view').model.attributes;
      console.log('Selected file', selectedFile);

      //this.connection.sendDataToPeer(peerName, selectedFile);
      App.rymdNode.shareResource(peerName, selectedFile.name);
    },

    renderAll: function(records) {
      records.forEach(this.addOne.bind(this));
    },

    addOne: function(record) {
      console.log('Record', record);
      var file = new FileModel({
        data: record.data,
        name: record.name,
        type: record.type,
        date: record.date
      });

      var view = new FileOptionView({model: file});
      this.$el.find('.files').prepend(view.render().el);
    },

    render: function() {
      App.Store.all().done(this.renderAll.bind(this));
    }
  });
})();
