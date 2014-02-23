// initConnection.then(registerEndPoint).then(connectToPeers)
// new ConnectionHandler({ name: 'Niklas', endPoint: { host, port}, dht: 'http://ada:80' })
;(function() {

  // Reference to `window` in the browser and `exports`
  // on the server.
  var root = this;

  var Q = require('q');

  function Connection(options) {
    this.name = options.name;
    this.endPoint = options.endPoint;
    this.dht = options.dht;
  }

  // function to init connection to server
  Connection.prototype.connect = function() {
    // connect to peerjs server
    var peer = new Peer({ host: this.endPoint.host, port: this.endPoint.port });

    var connection = this;

    // gives us an id when connected
    peer.on('open', function(id) {
      // use this id and Name to register with other service
      registerEndPoint.call(connection, id);
    });
    // save the connection
  };

  function registerEndPoint(id) {
    var endPointUrl = this.dht + '/identities/' + this.name + '/endpoints';

    var formData = new FormData();
    formData.append('id', id);
    formData.append('host', this.endPoint.host);
    formData.append('port', this.endPoint.port);

    var req = new XMLHttpRequest();
    req.open('POST', endPointUrl);

    req.onload = function(e) {
      var res = this.response;
      if (this.status == 200) {
        console.log('Arguments', arguments);
      }
    };

    req.send(formData);
  }

  // function to init peer connection to friends
  function connectToPeer() {
    // pass the names to nodeservice

    // retrieves endpoints and pubkeys
    // for each and everyone
    //    connect to them using the endpoints
    //    validate that its the right person
  }
});