module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template($("#file-template").html()),

    initialize: function() {

    },

    events: {
      "click .resource" : "toggle",
      "click .share-file" : "shareResource"
    },

    toggle: function(evt) {
      var panel = this.$(".sharing-panel");

      var method = panel.is(":hidden") ? "slideDown" : "slideUp",
          classAction = panel.is(":hidden") ? "add" : "remove";

      panel[method](200).find("input").focus().on('keydown', function(evt) {
        if(evt.which === 13) {
          this.shareResource();
        }
      }.bind(this));
      this.$el[classAction+"Class"]("expanded");
    },

    shareResource: function(evt) {
      var peer = this.$(".remote-identity").val(),
          guid = this.$(".resource").data("guid");

      if(!peer || peer.length < 1 || !guid) return;

      App.rymdNode.shareResource(guid, peer).catch(function(err) {
        noty({
          text: err.message,
          layout: 'topCenter',
          type: 'error'
        });
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
