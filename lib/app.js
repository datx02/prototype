(function(root, Store) {

	var UploadView = require("./views/UploadView"),
		AppView = require("./views/AppView");

	root.App = {

		Store: new Store(),

		Views: {},
		Collections: {},
		Models: {},

		start: function() {
			console.log("init");

			this.Views.App = new AppView();
		}
	};

})(window, require("indexeddbstore"));
