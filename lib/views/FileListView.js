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
			
			records.forEach(function(record) {
				var file = new FileModel({
					data: record.data,
					name: record.name,
					type: record.type,
					date: record.date
				});
				var view = new FileView({model: file});

				this.$el.prepend(view.render().el);

			}.bind(this));
		},

		render: function() {
			App.Store.all().done(this.renderAll.bind(this));
			return this;
		}
	});
})()
