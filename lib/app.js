(function(root, Store, Connection) {

  var UploadView = require("./views/UploadView"),
    AppView = require("./views/AppView");

    var verifier = new Rymd.DHT({
      host: 'datx02.dev',
      port: 1337
    });
    var network = new Rymd.Network({
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

    Connection: Connection,
    Store: new Store(),

    Views: {},
    Collections: {},
    Models: {},
    rymdNode: rymdNode,

    start: function() {
      this.Views.App = new AppView();
    }
  };
})(window, require("indexeddbstore"), require('./connection'));
