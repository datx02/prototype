module.exports = (function() {

  return Backbone.View.extend({
    template:_.template($("#test-template").html())
    
    ,initialize: function() {
      //this.uploadView = new UploadView({el: $("#upload")});
      //this.fileListView = new FileListView({el: $("#file-list ul")});
      //this.fileListView.listenTo(this.uploadView, "success", this.fileListView.render);
    },

    content: function(evt) {
      //this.$el.html(childView.render().el);
    },
    
    render: function() {
      this.$el.html(this.template());
      return this;
    }
  })
})();