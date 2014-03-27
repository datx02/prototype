module.exports = (function() {

  return Backbone.View.extend({

    template: _.template($("#key-template").html()),

    events: {
      'click .connect': 'connect'
    },

    identity: "",

    initialize: function() {
      noty({ 
           layout: 'topLeft',
           type: 'alert',
            text: 
            'No private key found! To upload a existing key click \'Upload\'. To create a new keypair, click \'Generate\'',
            buttons: [{
              addClass: "btn small",
              text: "Upload",
              onClick: function($noty) {
                $("#upload-key").show();
                $noty.close();
              }
            },
            {
              addClass: "btn small",
              text: "Generate",
              onClick: function($noty) {
                App.rymdNode.crypto.generateKeyPair(1024).then(function(key){
                  $('#public').html(Utils._uint8ArrayToString(key.publicKey));
                  $('#private').html(Utils._uint8ArrayToString(key.privateKey));
                  

                }).then(function($noty){
                  $("#generate-key").show();
                  $noty.close();
                });
              }
            }]
          });
      
    },

    connect: function(evt) {
        var key = $('#key-text').val();
                console.log(key)
        App.rymdNode.setPrivateKey(key,this.identity);
        debugger;
        App.Router.navigate("connect/"+this.identity, { trigger: true, replace: true });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
