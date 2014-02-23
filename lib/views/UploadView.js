module.exports = Backbone.View.extend({

	events: {
		"change .file-input" : "preview"
	},

	preview: function(evt) {
		var file = evt.target.files[0];
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
	}
})
