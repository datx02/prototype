// Arbitrary UI stuff

module.exports = (function(_, Backbone) {

  var Dropzone = (function() {

      _.extend(Dropzone.prototype, Backbone.Events);

      function Dropzone(el, events) {
        this.el = el;
        _.each(events, bindEvent.bind(this));
      }

      function bindEvent(func, event) {
        $(document).on(event, this.el, func);
      }

      Dropzone.prototype = (function() {
        return {

        };

      })();

      return Dropzone;

    })();

    return {
      Dropzone: Dropzone
    };

})(
  require("underscore"),
  require("backbone")
);
