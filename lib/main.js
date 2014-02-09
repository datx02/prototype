window.App = (function() {

	var IndexedDBStore = require("indexeddbstore")

	var Utils = {
		createObjectURL: function(obj) {
			var URL = window.URL || window.webkitURL || window.mozURL
			return URL.createObjectURL(obj)
		},
		convertToBase64: function(blob, cb) {
			var fr = new FileReader();

			fr.onload = function(evt) {
				cb(evt.target.result);
			}
			fr.onerror = function(err) {
				cb(err);
			}
			fr.readAsDataURL(blob);
		},

		browser: function() {
			var n = navigator.appName;
			var ua = navigator.userAgent;
			var tem;
			var m = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
			if (m && (tem = ua.match(/version\/([\.\d]+)/i)) != null) m[2] = tem[1];
			m = m ? [m[1], m[2]] : [n, navigator.appVersion, '-?'];
			if ((m[0] == "Netscape") && ua.match(/rv:11/g)) {
				m[0] = "MSIE";
			}
			return { 
				brand: m[0], 
				version: m[1] 
			};
		},

		hasBlobSupport: function() {
			var browser = Utils.browser().brand;
			return browser === "Firefox";
		}
	};

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

		if(!Utils.hasBlobSupport()) {
			Utils.convertToBase64(blob, function(data) {
				this.saveFile(data)
			}.bind(this));
		}
		else {
			this.saveFile(blob)
		}
	}

	App.prototype.saveFile = function(blob) {
		console.log("Saving file to IndexedDB")
		this.db.create(blob).done(this.addFileLink.bind(this), this.error)
	}

	App.prototype.addFileLink = function(file) {
		var url;
		if(Utils.hasBlobSupport()) {
			url = Utils.createObjectURL(file)
		}
		else {
			url = file
		}

		var $link = $("<a />", { href: url, text: "Link" })
		$("#file-container").append($link)
	}

	App.prototype.error = function(err) {
		console.error(err.message)
	}

	return App;

})();
