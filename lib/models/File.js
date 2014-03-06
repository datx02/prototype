module.exports = (function() {

	var Utils = require("indexeddbstore").Utils;

	return Backbone.Model.extend({

		toURL: function() {
			return Utils.toObjectURL(this.get("data"), this.get("type"));
		},

		type: function() {
          var type = this.get("type");
          if(!type) {
            return '';
          }
			var parts = type.split("/");
			return parts[parts.length-1];
		},

		toJSON: function() {
			// Override original toJSON and add URL attribute
			var org = Backbone.Model.prototype.toJSON.apply(this, arguments);
			return _.extend(org, {
				url: this.toURL(),
				type: this.type()
			});
		}
	});
})();
