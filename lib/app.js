(function(root, Rymd, DHT, Network, Store, Crypto) {

  var UploadView = require("./views/UploadView"),
    AppView = require("./views/AppView");

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

    var crypto = Crypto;

    var rymdNode = new Rymd.RymdNode({
      crypto: crypto,
      keyStore: store,
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

      start: function() {
        this.Views.App = new AppView();
      },

      init: function(identity) {
        App.rymdNode.init(identity).then(function() {
          console.log('Initialized with identity: ' + identity);
        },
        function(err) {
          console.error(err);
        });
    }
  };
})(window,
  require('rymd'),
  require('dht-client'),
  require('peerjs-connection'),
  require('indexeddbstore'),
  require('rymd-mock-crypto'));
