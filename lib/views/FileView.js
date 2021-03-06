module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#file-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'destroy remove', this.remove);
      this.on('shared', function() {
        this.$('.remote-identity').val('');
      }.bind(this));
    },

    events: {
      'click .share-file' : 'shareResource',
      'click .view-file': 'viewResource',
      'click .destroy' : 'destroyResource',
      'click .download' : 'downloadResource',
      'keydown .remote-identity' : 'listenOnEnter'
    },

    listenOnEnter: function(evt) {
      if(evt.which === 13) {
        this.shareResource(evt);
        this.trigger('shared', guid);
      }
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

      this.trigger('shared', guid);
    },

    viewResource: function(evt) {
      evt.stopImmediatePropagation();

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

    downloadResource: function(evt) {
      var guid = this.$('.resource').data('guid');
      App.rymdNode.requestResource(guid).then(function(resource) {
        App.Collections.Shared.remove(guid);
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
