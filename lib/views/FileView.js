module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'li',

    template: _.template('<a title="<%= date%>" href="<%= url %>"><span><%= name%></span><small class="file-type"><%= type %></small></a>'),

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})();
