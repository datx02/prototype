module.exports = (function() {

  return Backbone.View.extend({

    template: _.template($("#login-template").html()),

    events: {
      'click .connect': 'connect',
      'click .send': 'sendFileToPeer'
    },

    initialize: function() {

    },

    connect: function(evt) {
      evt.preventDefault();
      var identity = this.$el.find('#identity').val();
      App.Router.navigate("connect/"+identity, { trigger: true, replace: true });
    },

    sendFileToPeer: function() {
      var peerName = this.$el.find('.to-peer').val();

      var selectedFile = this.$el.find('.files option:selected').data('view').model.attributes;
      console.log('Selected file', selectedFile);

      App.rymdNode.shareResource(selectedFile.id, peerName);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
