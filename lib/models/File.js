module.exports = (function() {

	return Backbone.Model.extend({

		toURL: function() {
			return Rymd.Utils.toObjectURL(this.get("data"), this.get("type"));
		},

		type: function() {
      var type = this.attributes.metadata.type,
					parts = type.split("/");
			return parts[parts.length-1];
		},

		name: function() {
			return this.attributes.metadata.name;
		},

		toJSON: function() {
			// Override original toJSON and add URL attribute
			var org = Backbone.Model.prototype.toJSON.apply(this, arguments);
			return _.extend(org, {
				url: this.toURL(),
				name: this.name(),
				type: this.type()
			});
		}
	});
})();
