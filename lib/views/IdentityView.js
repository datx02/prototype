module.exports = (function() {

  return Backbone.View.extend({

    template: _.template('Hi <strong class="identity"><%= name %></strong>!'),

    initialize: function() {
      this.identity = {
        name: App.rymdNode.currentIdentity()
      };
    },

    render: function() {
      this.$el.html(this.template(this.identity));
      return this;
    }
  });
})();
