module.exports = (function() {

	var Utils = require("IndexedDBStore").Utils;

	return Backbone.Model.extend({

		initialize: function() {
			console.log(this);
		},

		toURL: function() {
			return Utils.toObjectURL(
				this.attributes.record.data, 
				this.attributes.record.type);
		},

		toJSON: function() {
			return {
				type: this.attributes.record.type,
				url: this.toURL()
			};
		}
	});
})();
