(function(root, Store, Connection) {

	var UploadView = require("./views/UploadView"),
		AppView = require("./views/AppView");

	root.App = {

		Connection: Connection,
		Store: new Store(),

		Views: {},
		Collections: {},
		Models: {},

		start: function() {
			this.Views.App = new AppView();
		}
	};

})(window, require("indexeddbstore"), require('./connection'));
