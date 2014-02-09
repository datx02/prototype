window.App = (function() {

	var store = require("indexeddbstore")

	function App(options) {
		this.options = options
		this._me = this.connection = null
	}

	App.prototype.init = function() {
		$("#peer-name").on("change", this.setPeer.bind(this))
		$("#submit").on("click", this.send.bind(this))
	}

	App.prototype.send = function(evt) {
		var sample = "Hej Johaaan"
		var other = $("#other-peer").val()

		this.connection = this._me.connect(other).on("open", function() {
			this.send(sample)
		})
	}

	App.prototype.setPeer = function(evt) {
		var id = $(evt.target).val()

		if(this._me !== null)
			this._me.destroy()
		
		this._me = new Peer(id, this.options)
		console.log("New peer created")

		this.bindEvents(this._me)
		console.log("Peer name changed to "+this._me.id)

		console.log("Connections", this._me.connections)
	}

	App.prototype.bindEvents = function(peer) {
		peer.on("error", this.error.bind(this))
		peer.on("connection", this.onconnect.bind(this))
		peer.on("open", this.onopen.bind(this))
	}

	App.prototype.onopen = function(id) {
		
	}

	App.prototype.onconnect = function(conn) {
		console.log("Connection established")
		conn.on("data", this.ondata.bind(this))
	}

	App.prototype.ondata = function(data) {
		console.log("Data", data)
	}

	App.prototype.error = function(err) {
		console.error(err)
	}

	return App;

})();
