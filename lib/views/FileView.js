module.exports = (function() {
	
	return Backbone.View.extend({

		tagName: 'li',

		template: _.template('<a href="<%= url %>">File (<%= type %>)</a>'),

		initialize: function() {
			this.render.bind(this);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}
	});
})();
