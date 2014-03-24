module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#file-template').html()),

    initialize: function() {

    },

    events: {
      'click .resource' : 'toggle',
      'click .share-file' : 'shareResource',
      'click .download-file': 'requestResource',
      'click .view-file': 'viewResource'
    },

    toggle: function(evt) {
      var panel = this.$('.sharing-panel');

      var method = panel.is(':hidden') ? 'slideDown' : 'slideUp',
          classAction = panel.is(':hidden') ? 'add' : 'remove';

      panel[method](200).find('input').focus();
      this.$el[classAction+'Class']('expanded')
    },

    shareResource: function(evt) {
      var peer = this.$('.remote-identity').val(),
          guid = this.$('.resource').data('guid');

      if(!peer || peer.length < 1 || !guid) return;

      App.rymdNode.shareResource(guid, peer);
    },

    requestResource: function(evt) {
      var guid = this.$('.resource').data('guid');

      if(!guid) return;

      App.rymdNode.requestResource(guid);
    },

    viewResource: function(evt) {
      evt.preventDefault();
      // get the resource id for the one click
      var guid = this.$('.resource').data('guid');

      var rymdStore = App.rymdNode.store;
      // request to store for the decrypted data
      rymdStore.getDecryptedResource(guid);
      // .then(function(resource) {
        // console.log('Args', arguments);
        // create objecturl etc, open new window
        // var objectUrl = Rymd.Utils.toObjectURL(resource.data.data, resource.metadata.type);
        // window.open(objectUrl, "_blank");
      // });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
