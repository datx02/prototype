module.exports = (function() {

  var IdentityView = require("./IdentityView"),
      FileListView = require("./FileListView"),
      SharedListView = require("./SharedListView"),
      UploadView = require("./UploadView");

  return Backbone.View.extend({

    template: _.template($("#home-template").html()),

    className: "home dropzone",

    initialize: function() {

      // Resources collections with IndexedDB store from Rymd
      var myFiles = App.Collections.Resources,
          sharedFiles = App.Collections.Shared;

      this.listenTo(sharedFiles, "add remove reset", this.updateSharedFilesCount.bind(this));

      myFiles.fetch({ reset: true });
      sharedFiles.fetch({ reset: true });

      // Init subviews

      this.fileListView = new FileListView({ collection: myFiles});
      this.sharedView = new SharedListView({ collection: sharedFiles });

      this.identityView = new IdentityView();
      this.uploadView = App.Views.Upload || (App.Views.Upload = new UploadView());

      this.listenTo(this.uploadView, "success", function(file) {
        myFiles.create(file);
      });
    },

    updateSharedFilesCount: function() {
      this.$el.find(".shared-count").html(App.Collections.Shared.length);
    },

    assign: function(selector, view) {
      var selectors;
      if (_.isObject(selector)) {
          selectors = selector;
      }
      else {
          selectors = {};
          selectors[selector] = view;
      }
      if (!selectors) return;

      _.each(selectors, function (view, selector) {
          view.setElement(this.$(selector)).render();
      }, this);
    },

    render: function() {
      this.$el.html(this.template());

      this.assign({
        "#my-files .file-list" : this.fileListView,
        "#my-shared-files .file-list": this.sharedView,
        "#upload" : this.uploadView,
        ".current-identity" : this.identityView
      });

      return this;
    }
  });
})();
