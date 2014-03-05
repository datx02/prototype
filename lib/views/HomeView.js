module.exports = (function() {

  var IdentityView = require("./IdentityView"),
      FileListView = require("./FileListView"),
      UploadView = require("./UploadView");

  return Backbone.View.extend({

    template: _.template($("#home-template").html()),

    className: "home dropzone",

    initialize: function() {

      // Init subviews

      this.fileListView = new FileListView();
      this.identityView = new IdentityView();
      this.uploadView = App.Views.Upload || (App.Views.Upload = new UploadView());

      this.fileListView.listenTo(this.uploadView, "success", this.fileListView.render);
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
        "#upload" : this.uploadView,
        ".current-identity" : this.identityView
      });

      return this;
    }
  });

  return Home;
})();
