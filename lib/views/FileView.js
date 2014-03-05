module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template('<a title="<%= date%>" href="<%= url %>"><%= name%> (<%= type %>)</a>'),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
