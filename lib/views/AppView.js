module.exports = (function() {

	var UploadView = require("./UploadView"),
		FileView = require("./FileListView");
	
	return Backbone.View.extend({

		initialize: function() {
			this.uploadView = new UploadView({el: $("#upload")});
			this.fileListView = new FileView({el: $("#file-list ul")});

			this.fileListView.listenTo(this.uploadView, "success", this.fileListView.render);
		}
	})
})();
