module.exports = (function() {

  return Backbone.View.extend({

    template: _.template($("#login-template").html()),

    events: {
      'click .connect': 'connect'
    },

    connect: function(evt) {
      evt.preventDefault();
      var identity = this.$el.find('#identity').val();
      if(identity !== undefined && identity.length) {

        App.rymdNode.getPrivateKey(identity).then(function(key) {
          App.Router.navigate("connect/"+identity, { trigger: true, replace: true });
        }.bind(this))
        .catch(function(err){
          console.log("No key exists for " + identity+"! Rendering new view");
          App.Router.navigate("importkey/"+identity, { trigger: true, replace: true });
        }.bind(this) );
      }
      else {
        var text = this.$(".connect").val();
        this.$(".connect").val("Please use a nickname!");
        setTimeout(function() {
          this.$(".connect").val(text);
        }.bind(this), 2000);

        this.$("#identity").focus();
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
