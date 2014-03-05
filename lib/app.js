(function(root, Rymd, DHT, Network, Store, Crypto) {

  var AppView = require("./views/AppView"),
      AppRouter = require("./Router"),

      UI = require("./ui");

    var verifier = new DHT.Verifier({
      host: 'datx02.dev',
      port: 1337
    });

    var network = new Network.Peer({
      host: 'datx02.dev',
      port: 9000,
    });

    var store = new Store({
      dbName: "prototype"
    });

    var keyStore = new Store({
      dbName: "prototype-keys"
    });

    var crypto = Crypto;

    var rymdNode = new Rymd.RymdNode({
      crypto: crypto,
      keyStore: keyStore,
      dataStore: store,
      network: network,
      verifier: verifier,
      endpointKeepaliveInterval: 5000
    });

    root.App = {

      Views: {},
      Collections: {},
      Models: {},
      rymdNode: rymdNode,

      isAuthenticated: function() {
        return this.rymdNode.isAlive();
      },

      start: function() {
        this.Views.AppView = new AppView({el: $("#app")});
        this.Router = new AppRouter(this.Views.AppView);

        var dropzone = new UI.Dropzone(".dropzone", {
          "dragend dragleave": function(evt) {
            $(this).removeClass("drag-hover");
            return false;
          },

          "dragover": function(evt) {
            $(evt.currentTarget).addClass("drag-hover");
            return false;
          },

          "drop": function(evt) {
            evt.preventDefault();
            $(evt.currentTarget).removeClass("drag-hover");
            App.Views.Upload.addFiles(evt.originalEvent.dataTransfer.files);
          }
        });

        Backbone.history.start();
      }
  };
})(window,
  require('rymd'),
  require('dht-client'),
  require('peerjs-connection'),
  require('indexeddbstore'),
  require('rymd-crypto'));
