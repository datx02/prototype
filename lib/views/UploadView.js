module.exports = Backbone.View.extend({

	initialize: function() {
		$(".dropzone").on("dragover", function() {
			$(this).addClass("drag-hover");
			return false; 
		});
		$(".dropzone").on("dragend dragleave", function() { 
			$(this).removeClass("drag-hover");
			return false;
		});
		$(".dropzone").on("drop", function(evt) {
			evt.preventDefault();
			$(evt.currentTarget).removeClass("drag-hover");
			this.addFiles(evt.originalEvent.dataTransfer.files);
		}.bind(this));
	},

	events: {
		"change .file-input" : "handleUpload"
	},

	addFiles: function(files) {
		var file = files[0];
		console.log("Adding file: " + file.name);

		//TODO: this view shouldn't really have direct access to the
		// DataStore and create blobs .. -.- Down the road we'll
		// abstract away the store into a Backbone adapter or such, which
		// will hopefully interact with the library methods rather than the
		// data store itself.
		App.Store.create(file).then(function(record) {
			this.trigger("success", record);
			this.$el.find(".file-input").val("");
		}.bind(this));
	},

	handleUpload: function(evt) {
		this.addFiles(evt.target.files);
	}
})
