module.exports = (function() {

  return Backbone.View.extend({

    initialize: function() {
      //this.uploadView = new UploadView({el: $("#upload")});
      //this.fileListView = new FileListView({el: $("#file-list ul")});
      //this.fileListView.listenTo(this.uploadView, "success", this.fileListView.render);
    },

    content: function(childView) {
      this.$el.html(childView.render().el);
    }
  })
})();
