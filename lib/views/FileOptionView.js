module.exports = (function() {

  return Backbone.View.extend({

    tagName: 'option',

    template: _.template('<%= name%> (<%= type %>)'),

    initialize: function() {
      this.render.bind(this);
    },

    render: function() {
      // TODO might be an antipattern to create this circular reference
      this.$el.html(this.template(this.model.toJSON())).data('view', this);
      return this;
    }
  });
})();
