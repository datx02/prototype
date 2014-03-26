module.exports = (function() {

  var ConnectionView = require("./views/ConnectionView"),
      HomeView = require("./views/HomeView"),
      IdentityView = require("./views/IdentityView");

  return Backbone.Router.extend({

    initialize: function(rootElement) {
      this.$el = rootElement;
    },

    root: "",

    routes: {
      "" : "default",
      "login" : "renderLogin",
      "connect/:identity" : "connect",
      "logout" : "destroySession"
    },

    _redirect: function(route) {
      this.navigate(route, { trigger: true });
    },

    _render: function(view) {
      this.$el.content(view);
    },

    default: function() {
      if(!App.Models.Session.authenticated()) {
        return this._redirect("login");
      }

      this._render( App.Views.Home || (App.Views.Home = new HomeView()) );
      $("body").addClass("authed");
    },

    connect: function(identity) {
      App.Models.Session.save(identity);
      App.rymdNode.init(identity).then(function() {
        this._redirect(this.root);
      }.bind(this));
    },

    renderLogin: function() {
      this._render(new ConnectionView());
    },

    destroySession: function() {
      App.Models.Session.destroy();
      this._redirect("login");
    }

  });

})();
