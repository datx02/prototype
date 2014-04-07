module.exports = (function() {

  return Backbone.Model.extend({

    defaults: {
      user_id: null,
      has_key: false
    },

    store: window.localStorage,

    initialize: function() {
      this.load();
    },

    load: function() {
      this.set({
        user_id: this.store.getItem('user_id'),
        generated_pubkey: this.store.getItem('generated_pubkey'),
        has_key: this.store.getItem('has_key')
      });
    },

    authenticated: function() {
      return Boolean(this.get('user_id')) && Boolean(this.get('has_key'));
    },

    destroy: function() {
      this.set('user_id', null);
      this.set('has_key', false);
      this.set('generated_pubkey', null);
      this.store.removeItem('user_id');
      this.store.removeItem('has_key');
      this.store.removeItem('generated_pubkey');
    },

    save: function(opts) {
      this.set(opts);
      this.store.setItem('user_id', opts.user_id);
      this.store.setItem('has_key', opts.has_key);
      this.store.setItem('generated_pubkey', opts.generated_pubkey);
    }

  });
})();
