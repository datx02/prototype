(function(root, Rymd, DHT, Network, Store) {

  var UploadView = require("./views/UploadView"),
    AppView = require("./views/AppView");

    var verifier = new DHT({
      host: 'datx02.dev',
      port: 1337
    });

    var network = new Network.Peer({
      host: 'datx02.dev',
      port: 9000,
    });

    var rymdNode = new Rymd.RymdNode({
      crypto: {},
      keyStore: {},
      dataStore: {},
      network: network,
      verifier: verifier
    });

    root.App = {

      Store: new Store(),

      Views: {},
      Collections: {},
      Models: {},
      rymdNode: rymdNode,

      start: function() {
        this.Views.App = new AppView();
      },
      
      init: function(identity) {
        App.rymdNode.init(identity).then(function() {
          console.log("Initialized with identity: " + identity);
        },
        function(err) {
          console.error(err);
        });
    }
  };
})(window, require('rymd'), require('dht-client'), require('peerjs-connection'), require("indexeddbstore"));
