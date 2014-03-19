module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template($("#file-template").html()),

    initialize: function() {

    },

    events: {
      "click .resource" : "toggle",
      "click .share-file" : "shareResource",
      "click .download-file": "requestResource"
    },

    toggle: function(evt) {
      var panel = this.$(".sharing-panel");

      var method = panel.is(":hidden") ? "slideDown" : "slideUp",
          classAction = panel.is(":hidden") ? "add" : "remove";

      panel[method](200).find("input").focus();
      this.$el[classAction+"Class"]("expanded")
    },

    shareResource: function(evt) {
      var peer = this.$(".remote-identity").val(),
          guid = this.$(".resource").data("guid");

      if(!peer || peer.length < 1 || !guid) return;

      App.rymdNode.shareResource(guid, peer);
    },

    requestResource: function(evt) {
      var guid = this.$(".resource").data("guid");

      if(!guid) return;

      App.rymdNode.requestResource(guid);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
