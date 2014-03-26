/*
  Backbone <=> IndexedDBStore adapter
*/
module.exports = (function(root) {

  var Backbone = root.Backbone,
      _ = root._;

  Backbone.ResourceStore = function(backingStore) {
    this.store = backingStore;
  };

  _.extend(Backbone.ResourceStore.prototype, {

    all: function() {
      return this.store.getResources();
    },

    find: function(model) {
      return this.store.getResource(model.id, true);
    },

    update: function(model) {
      throw new Error("Updating resources aren't supported as of now");
    },

    destroy: function(model) {
      return this.store.getResource(model.id, false)
        .then(this.store.destroyResource.bind(this.store));
    },

    create: function(model) {
      return this.store.createResource(
          model.attributes.metadata.name,
          model.get('data'),
          model.attributes.metadata.author,
          model.attributes.metadata.type)
        .then(this.store.saveResource.bind(this.store))
        .then(this.store.getResource.bind(this.store));
    }
  });


  // Sync methods

  Backbone.ResourceStore.sync = Backbone.localSync = function(method, model, options) {
    var store = model.resourceStore || model.collection.resourceStore;

    var responsePromise,
        errorMessage,

        syncDfd = Backbone.$ ?
        (Backbone.$.Deferred && Backbone.$.Deferred()) :
        (Backbone.Deferred && Backbone.Deferred());

    try {

      switch(method) {
      case 'read':
        responsePromise = model.id !== undefined ? store.find(model) : store.all();
        break;

      case 'create':
        responsePromise = store.create(model);
        break;

      case 'update':
        responsePromise = store.update(model);
        break;

      case 'delete':
        responsePromise = store.destroy(model);
        break;
      }

    } catch(error) {
      errorMessage = error.message;
    }

    if(responsePromise) {

      if(options && options.success) {
        responsePromise.done(function(response) {
          options.success(response);
        });
      }

      if(syncDfd) {
        syncDfd.resolve(responsePromise);
      }
    }
    else {
      console.error(errorMessage);

      if(options && options.error) {
        options.error(errorMessage);
      }

      if(syncDfd) {
        syncDfd.reject(errorMessage);
      }

      // Compability with $.ajax
      if(options && options.complete) {
        responsePromise.done(function(response) {
          options.complete(response);
        });
      }

      return syncDfd && syncDfd.promise();
    }

  };

  Backbone.ajaxSync = Backbone.sync;

  Backbone.getSyncMethod = function(model) {
    if(model.resourceStore || (model.collection && model.collection.resourceStore)) {
      return Backbone.localSync;
    }

    return Backbone.ajaxSync;
  };

  Backbone.sync = function(method, model, options) {
    return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
  }

  return Backbone.ResourceStore;

})(window);
