(function(root, Rymd, DHT, Network, Store, Crypto) {

  var AppView = require("./views/AppView"),
      AppRouter = require("./Router"),
      ResourcesCollection = require("./collections/Resources"),
      Session = require("./models/Session"),

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
      dbName: "prototype",
      stores: ['data', 'keys']
    });

    var crypto = Crypto;

    var rymdNode = new Rymd.RymdNode({
      crypto: crypto,
      dataStore: store,
      stores: {
        dataStore: 'data',
        keyStore: 'keys'
      },
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
        App.Models.Session = new Session();

        // Main files collection
        App.Collections.Resources = new ResourcesCollection();
        // Shared (incomplete) files collection
        App.Collections.Shared = new ResourcesCollection([], { shared: true });

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

        var toggle = new UI.Toggle('.file-list .file-name', '.sharing-panel');

        App.rymdNode.on('share', function(peer, data, connection) {
          noty({
            text: peer + ' wants to share "'+ data.metadata.name +'" with you',
            buttons: [{
              addClass: "btn-accent small",
              text: "Download now",
              onClick: function($noty) {
                App.rymdNode.requestResource(data.metadata.id);
                $noty.close();
              }
            },
            {
              addClass: "btn small",
              text: "Later",
              onClick: function($noty) {
                $noty.close();
              }
            }]
          });
        });

        App.rymdNode.on('request', function(peer, data, connection) {
          // Immediately send the requested resource
          // TODO: why call sendResource on connection, and not RymdNode?
          App.rymdNode.store.getResource(data.guid, true)
            .then(connection.sendResource.bind(connection));
        });

        // Listen to links and routes
        $(document).on('click', "a[href^='/#']", function(evt) {
          evt.preventDefault();
          this.Router.navigate(evt.target.hash.slice(1), { trigger: true });
        }.bind(this));

        Backbone.history.start();
      }
  };
})(window,
  require('rymd'),
  require('dht-client'),
  require('peerjs-connection'),
  require('indexeddbstore'),
  require('rymd-crypto'));
