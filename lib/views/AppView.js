module.exports = (function() {

	var UploadView = require("./UploadView"),
		FileListView = require("./FileListView"),
		ConnectionView = require('./ConnectionView');

	return Backbone.View.extend({

		initialize: function() {
			this.uploadView = new UploadView({el: $("#upload")});
			this.fileListView = new FileListView({el: $("#file-list ul")});
			this.connectionView = new ConnectionView({ el: $('#connection') });
			// newConnection view, should liten to the uploadview?
			this.fileListView.listenTo(this.uploadView, "success", this.fileListView.render);
		}
	})
})();
