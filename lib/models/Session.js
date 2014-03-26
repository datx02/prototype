module.exports = (function() {

  return Backbone.Model.extend({

    defaults: {
      user_id: null
    },

    store: window.localStorage,

    initialize: function() {
      this.load();
    },

    load: function() {
      this.set({
        user_id: this.store.getItem('user_id')
      });
    },

    authenticated: function() {
      return Boolean(this.get('user_id'));
    },

    destroy: function() {
      this.set('user_id', null);
      this.store.removeItem('user_id');
    },

    save: function(user_id) {
      this.set('user_id', user_id);
      this.store.setItem('user_id', user_id);
    }

  });
})();
