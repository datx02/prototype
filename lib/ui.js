// Arbitrary UI stuff

module.exports = (function(_, Backbone) {

  var Utils = Rymd.Utils,
      extend = Utils.extend;

  var T = (function() {

    function Toggle(el, expandingPanel) {
      this.element = el;
      this.panel = expandingPanel;

      this.openPanels = {};

      $(document).on('click', this.element, this.toggle.bind(this));

      $(document).on('toggle', $(this.element).find(this.panel), function(evt) {
        var classAction = $(evt.target).is(':hidden') ? 'remove' : 'add';
        $(evt.target).parents('li')[classAction+'Class']('expanded')
      }.bind(this));
    }

    Toggle.prototype = (function() {
      return {

        closeAll: function(opts) {
          var except = opts && opts.except;
          $(this.element)
            .parents('li')
            .not(except)
            .find(this.panel)
            .slideUp(200)
            .trigger('toggle')
        },

        toggle: function(evt) {
          var li = $(evt.target).parents('li'),
              panel = li.find(this.panel);

              console.log(evt.target)

          var method = panel.is(':hidden') ? 'slideDown' : 'slideUp';

          panel[method](200).trigger('toggle').find("input").focus();
          this.closeAll({except: li});
        }
      };
    })();

    return Toggle;

  })();

  var DZ = (function() {

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
      Dropzone: DZ,
      Toggle: T
    };

})(
  require("underscore"),
  require("backbone")
);
