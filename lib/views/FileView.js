module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#file-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'change', this.render);
    },

    events: {
      'click .resource' : 'toggle',
      'click .share-file' : 'shareResource',
      'click .view-file': 'viewResource',
      'click .destroy' : 'destroyResource'
    },

    toggle: function(evt) {
      var panel = this.$('.sharing-panel');

      var method = panel.is(':hidden') ? 'slideDown' : 'slideUp',
          classAction = panel.is(':hidden') ? 'add' : 'remove';

      panel[method](200).find("input").focus().on('keydown', function(evt) {
        if(evt.which === 13) {
          this.shareResource();
        }
      }.bind(this));
      this.$el[classAction+"Class"]("expanded");
    },

    shareResource: function(evt) {
      var peer = this.$('.remote-identity').val(),
          guid = this.$('.resource').data('guid');

      if(!peer || peer.length < 1 || !guid) return;

      App.rymdNode.shareResource(guid, peer).catch(function(err) {
        noty({
          text: err.message,
          layout: 'topCenter',
          type: 'error'
        });
      });
    },

    viewResource: function(evt) {
      evt.preventDefault();
      var guid = this.$('.resource').data('guid');

      App.rymdNode.store.getDecryptedResource(guid).then(function(resource) {
        // create objecturl etc, open new window
        var objectUrl = Rymd.Utils.toObjectURL(resource.data.data, resource.metadata.type);
        window.open(objectUrl, "_blank");
      });
    },

    destroyResource: function(evt) {
      evt.preventDefault();
      this.model.destroy({
        success: function(model) {
          noty({
            text: "Removed '" + model.attributes.metadata.name + "'",
            timeout: 3000,
            layout: 'topCenter'
          });
        }
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
