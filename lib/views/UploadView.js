module.exports = Backbone.View.extend({

  initialize: function() {

  },

  events: {
    "change .file-input" : "handleUpload"
  },

  addFiles: function(files) {
    if(files.length > 1) {
      console.log("Adding files: " + files);
      // Convert to regular array
      files = Array.prototype.slice.call(files);
      console.log(files);
    }
    else {
      console.log("Adding file: " + files[0].name);
      console.log(files[0]);
      files = files[0];
    }

    //TODO: this view shouldn't really have direct access to the
    // DataStore and create blobs .. -.- Down the road we'll
    // abstract away the store into a Backbone adapter or such, which
    // will hopefully interact with the library methods rather than the
    // data store itself.
    //var resource = App.rymdNode.createResource(files.
    App.rymdNode.store.createResource(files).then(App.rymdNode.store.saveResource.bind(App.rymdNode.store)).then(function(records) {
      this.trigger("success", records);
      this.$el.find(".file-input").val("");
    }.bind(this));
  },

  handleUpload: function(evt) {
    this.addFiles(evt.target.files);
  }
})
