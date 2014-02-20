window.App = (function() {

	var IndexedDBStore = require("indexeddbstore")

	function App(options) {
		this.options = options
		this._me = this.connection = null
		this.metadata = {}

		this.db = new IndexedDBStore
	}

	App.prototype.init = function() {
		$("#peer-name").on("change", this.setPeer.bind(this))
		$("#file").on("change", this.setFile.bind(this))
		$("#submit").on("click", this.send.bind(this))

		this.listFiles()
	}

	App.prototype.listFiles = function(){
		this.db.all().done(function(files) {
			files.forEach(this.addFileLink.bind(this))
		}.bind(this))
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
		this.connection = conn
		console.log("Connection established")
		conn.on("data", this.ondata.bind(this))
	}

	App.prototype.ondata = function(data) {
		var meta = this.connection.metadata
		console.log("Receiving: ", meta.name)

		var blob = new Blob([data], { type: meta.filetype })
		this.saveFile(blob).done(this.addFileLink.bind(this), this.error)
	}

	App.prototype.saveFile = function(blob) {
		console.log("Saving file to IndexedDB")
		return this.db.create(blob)
	}

	App.prototype.addFileLink = function(record) {
		var url = IndexedDBStore.Utils.toObjectURL(record.data, record.type)
		
		var $el = $("<a />", { href: url, text: "Link" })
		var $li = $("<li />", {html: $el})
		$("#file-container").append($li)
	}

	App.prototype.error = function(err) {
		console.error(err.message)
	}

	return App;

})();
