var FormSerializer = require("./form-serializer"),
    Helper         = require("./helper");

(function($) {
  var helper = new Helper($ || {});

  $.fn.serializeObject = function() {

    var form = $(this);

    if (form.length > 1) {
      return new Error("jquery-serialize-object can only serialize one form at a time");
    }

    return new FormSerializer(helper).
      addPairs(form.serializeArray()).
      serialize();
  };

})(jQuery);
