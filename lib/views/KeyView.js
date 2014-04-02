module.exports = (function() {

  return Backbone.View.extend({

    template: _.template($("#key-template").html()),

    events: {
      'click .connect': 'connect'
    },

    initialize: function(opts) {
      this.identity = opts.identity;
    },

    connect: function(evt) {
      evt.preventDefault();

      var generateKey = $('#generate-key').is(':checked'),
          ownKey = $("#key").text();

      debugger

      if(generateKey) {
        App.rymdNode.crypto.generateKeyPair(1024)
        .then(function(keyPair) {
          return App.rymdNode.setPrivateKey(keyPair.privateKey, this.identity);
        }.bind(this))
        .then(function() {
          debugger
          return App.Router.navigate("connect/"+this.identity, { trigger: true, replace: true });
        }.bind(this));
      }
      else {
        //
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
