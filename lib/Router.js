module.exports = (function() {

  var ConnectionView = require("./views/ConnectionView"),
      HomeView = require("./views/HomeView"),
      IdentityView = require("./views/IdentityView");
      KeyView = require("./views/KeyView")

  return Backbone.Router.extend({

    initialize: function(rootElement) {
      this.$el = rootElement;
    },

    root: "",

    routes: {
      "" : "default",
      "login" : "login",
      "connect/:identity" : "connect",
      "connect/:identity/key": "key"
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
      $("body").addClass("authed");
    },

    key: function(identity){
      console.log(identity);
      var key = new KeyView();
      key.identity = identity;
      this._render(key);
    },

    connect: function(identity) {
      App.rymdNode.init(identity).then(function() {
        this._redirect(this.root);
      }.bind(this));
      //App.rymdNode.test();
    },

    login: function() {
      this._render(new ConnectionView());
    }

  });

})();
