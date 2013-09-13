/*!
 * jQuery Form Serialization Plugin 

 * Original by (macek jquery serialization)
 * https://github.com/macek/jquery-serialize-object
 *
 * @version: 1.0.1
 * @updated By: Daniel Bernal
*/ 
 

/*
This magic serialization plugin supports
----------------------------------------
<input name="honey[badger]" value="a">
<input name="wombat[]" value="b">
<input name="hello[panda][]" value="c">
<input name="animals[0][name]" value="d">
<input name="animals[0][breed]" value="e">
<input name="crazy[1][][wonky]" value="f">
<input name="dream[as][vividly][as][you][can]" value="g">
*/


(function($) {

  return $.fn.serializeObject = function() {

    var json, patterns, push_counters, _this = this;
    
    json = {};
    push_counters = {};

    patterns = {
      validate: /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
      key: /[a-zA-Z0-9_]+|(?=\[\])/g,
      push: /^$/,
      fixed: /^\d+$/,
      named: /^[a-zA-Z0-9_]+$/
    };

    this.build = function(base, key, value) {
      
      //Parses Numbers
      if(!isNaN(value)) {
        value =  parseFloat(value);
       }

      //Booleans       
      if (value.toString().match(/true|false/)) {
        value = (/^true$/i).test(value);
       }

      base[key] = value;
      return base;
      
    };

    this.push_counter = function(key) {
      if (push_counters[key] === void 0) {
        push_counters[key] = 0;
      }
      return push_counters[key]++;
    };

    $.each($(this).serializeArray(), function(i, elem) {

      var k, keys, merge, re, reverse_key;

      if (!patterns.validate.test(elem.name)) {
        return;
      }

      keys = elem.name.match(patterns.key);
      merge = elem.value;
      reverse_key = elem.name;

      while ((k = keys.pop()) !== void 0) {

        if (patterns.push.test(k)) {
          re = new RegExp("\\[" + k + "\\]$");
          reverse_key = reverse_key.replace(re, '');
          merge = _this.build([], _this.push_counter(reverse_key), merge);
        } 
        
        else if (patterns.fixed.test(k)) {
          merge = _this.build([], k, merge);
        }
         
        else if (patterns.named.test(k)) {
          merge = _this.build({}, k, merge);
        }
      }

      return json = $.extend(true, json, merge);

    });
    return json;
  };

})(jQuery);
