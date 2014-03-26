module.exports = (function() {

  var File = require('../models/File');


  return Backbone.View.extend({

    initialize: function() {

    },

    events: {
      "change .file-input" : "handleUpload"
    },

    addFiles: function(files) {
      if(files.length > 1) {
        throw "We're not supporting multiple files right now";
      }
      else {
        console.log("Adding file: " + files[0].name);
        files = files[0];
      }

      var file = new File({
        data: files,
        metadata: {
          type: files.type,
          name: files.name,
          author: App.rymdNode.currentIdentity() || 'Anonymous'
        }
      });

      this.trigger("success", file);
      this.$el.find(".file-input").val("");
    },

    handleUpload: function(evt) {
      this.addFiles(evt.target.files);
    }
  })
})();
