module.exports = (function() {

  var ConnectionView = require("./views/ConnectionView"),
      HomeView = require("./views/HomeView"),
      KeyView = require("./views/KeyView"),
      IdentityView = require("./views/IdentityView");

  return Backbone.Router.extend({

    initialize: function(rootElement) {
      this.$el = rootElement;
      this.session = App.Models.Session;
    },

    root: "",

    routes: {
      "" : "default",
      "login" : "renderLogin",
      "connect/:identity" : "connect",
      "importkey/:identity" : "saveKey",
      "logout" : "destroySession"
    },

    _redirect: function(route) {
      this.navigate(route, { trigger: true });
    },

    _render: function(view) {
      this.$el.content(view);
    },

    default: function() {
      if(!this.session.authenticated()) {
        return this._redirect("login");
      }

      App.rymdNode.init(this.session.get('user_id')).then(function() {
        this._render( App.Views.Home || (App.Views.Home = new HomeView()) );
        $("body").addClass("authed");
      }.bind(this));
    },

    connect: function(identity) {
      this.session.save({user_id: identity, has_key: true});
      this._redirect(this.root);
    },

    saveKey: function(identity) {
      this._render( App.Views.Key || (App.Views.Key = new KeyView({ identity: identity })) );
    },

    renderLogin: function() {
      this._render(new ConnectionView());
    },

    destroySession: function() {
      this.session.destroy();
      this._redirect("login");
    }

  });

})();
