module.exports = Backbone.View.extend({

	events: {
		"change .file-input" : "preview"
	},

	preview: function(evt) {
		var file = evt.target.files[0];
		console.log("Adding file: " + file.name);

		App.Store.create(file).then(function(record) {
			this.trigger("success", record);
			this.$el.find(".file-input").val("");
		}.bind(this));
	}
})
