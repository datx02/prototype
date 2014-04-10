module.exports = (function() {

  return Backbone.View.extend({

    template: _.template($("#showkey-template").html()),

    events: {
      'click .connect': 'connect'
    },

    initialize: function(opts) {
      this.session = App.Models.Session;
      this.identity = opts.identity;
      this.pubkey = this.session.generated_pubkey;
    },

    connect: function(evt) {
      evt.preventDefault();
      return App.Router.navigate("/connect/"+this.identity, { trigger: true, replace: true });
    },

    render: function() {
      this.$el.html(this.template({identity: this.identity, pubkey: this.pubkey}));
      return this;
    }
  });
})();

