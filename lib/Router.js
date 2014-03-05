module.exports = (function() {

  var ConnectionView = require("./views/ConnectionView"),
      HomeView = require("./views/HomeView"),
      IdentityView = require("./views/IdentityView");

  return Backbone.Router.extend({

    initialize: function(rootElement) {
      this.$el = rootElement;
    },

    routes: {
      "" : "default",
      "login" : "login",
      "connect/:identity" : "connect"
    },

    _redirect: function(route) {
      this.navigate(route, { trigger: true });
    },

    _render: function(view) {
      this.$el.content(view);
    },

    default: function() {
      if(!App.isAuthenticated()) {
        return this._redirect("login");
      }

      this._render( App.Views.Home || (App.Views.Home = new HomeView()) );
    },

    connect: function(identity) {
      App.rymdNode.init(identity).then(function() {
        console.log("Initialized with identity: " + identity);
        this._redirect("");
      }.bind(this));
    },

    login: function() {
      this._render(new ConnectionView);
    }

  });

})();
