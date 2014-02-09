window.App = (function() {

	var store = require("indexeddbstore")
	var URL = window.URL || window.webkitURL || window.mozURL;

	function App(options) {
		this.options = options
		this._me = this.connection = null
		this.metadata = {}
	}

	App.prototype.init = function() {
		$("#peer-name").on("change", this.setPeer.bind(this))
		$("#file").on("change", this.setFile.bind(this))
		$("#submit").on("click", this.send.bind(this))
	}

	App.prototype.send = function(evt) {
		var other = $("#other-peer").val()
		var app = this

		this.connection = this._me.connect(other, { metadata: app.metadata }).on("open", function() {
			this.send(app.arraybuffer)
		})
	}

	App.prototype.setFile = function(evt) {
		var files = evt.target.files
		var app = this

		for(var i = 0; i < files.length; i++) {
			var item = files[i]
			var reader = new FileReader

			reader.onload = function(evt) {
				app.arraybuffer = evt.target.result
				app.metadata = {
					filetype: item.type,
					name: item.name
				}
			}

			reader.readAsArrayBuffer(item)
		}
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
		conn.on("data", this.ondata)
	}

	App.prototype.ondata = function(data) {
		var connection = this
		console.log("Receiving: ", connection.metadata.name)
		console.log(connection.metadata)

		var blob = new Blob([data], { type: connection.metadata.filetype })
		var url = URL.createObjectURL(blob)

		var $link = $("<a />", { href: url, text: connection.metadata.name })
		$("#file-container").append($link)
	}

	App.prototype.error = function(err) {
		console.error(err)
	}

	return App;

})();
