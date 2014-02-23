module.exports = (function() {

	var FileModel = require("../models/File"),
		FileView = require("./FileView");

	// TODO: this view should actually be coupled with a 
	// Backbone Collection.
	return Backbone.View.extend({

		initialize: function() {
			this.render.bind(this);
			this.render();
		},

		renderAll: function(records) {
			this.$el.html("");
			records.forEach(this.addOne.bind(this));
		},

		addOne: function(record) {
			var file = new FileModel({
				data: record.data,
				name: record.name,
				type: record.type,
				date: record.date
			});

			var view = new FileView({model: file});
			this.$el.prepend(view.render().el);
		},

		render: function(files) {
			if(files === undefined) {
				App.Store.all().done(this.renderAll.bind(this));
			}
			else {
				files.forEach(this.addOne.bind(this));
			}
			
			return this;
		}
	});
})()
