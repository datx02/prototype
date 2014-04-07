module.exports = (function() {

  var Q = require('q');

  return Backbone.View.extend({

    template: _.template($("#key-template").html()),

    events: {
      'click .connect': 'connect'
    },

    initialize: function(opts) {
      this.session = App.Models.Session;
      this.identity = opts.identity;
    },

    connect: function(evt) {
      evt.preventDefault();

      var generateKey = $('#generate-key').is(':checked');

      if(generateKey) {

        // Generate new key

        App.rymdNode.crypto.generateKeyPair(1024)
        .then(function(keyPair) {
          this.session.generated_pubkey = RymdUtils.uint8ArrayTobase64(keyPair.publicKey);
          return App.rymdNode.setPrivateKey(keyPair.privateKey, this.identity);
        }.bind(this))
        .then(function() {
            return App.Router.navigate('showkey/'+this.identity, { trigger: true, replace: true })
        }.bind(this));
      }
      else {
        var ownKey = $("#key").val();

        // .. or use existing

        var key = Rymd.Utils.base64ToUint8Array(ownKey);
        return App.rymdNode.setPrivateKey(key, this.identity).then(function() {
          return App.Router.navigate("/connect/"+this.identity, { trigger: true, replace: true });
        }.bind(this));
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
