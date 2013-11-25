;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var FormSerializer = module.exports = function FormSerializer(helper) {
  this._helper    = helper;
  this._object    = {};
  this._pushes    = {};
  this._patterns  = {
    validate: /^[a-z][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
    key:      /[a-z0-9_]+|(?=\[\])/gi,
    push:     /^$/,
    fixed:    /^\d+$/,
    named:    /^[a-z0-9_]+$/i
  };
};

FormSerializer.prototype._build = function _build(base, key, value) {
  base[key] = value;
  return base;
};

FormSerializer.prototype._makeObject = function _nest(root, value) {

  var keys = root.match(this._patterns.key), k;

  // nest, nest, ..., nest
  while ((k = keys.pop()) !== undefined) {
    // foo[]
    if (this._patterns.push.test(k)) {
      var idx = this._incrementPush(root.replace(/\[\]$/, ''));
      value = this._build([], idx, value);
    }

    // foo[n]
    else if (this._patterns.fixed.test(k)) {
      value = this._build([], k, value);
    }

    // foo; foo[bar]
    else if (this._patterns.named.test(k)) {
      value = this._build({}, k, value);
    }
  }

  return value;
};

FormSerializer.prototype._incrementPush = function _incrementPush(key) {
  if (this._pushes[key] === undefined) {
    this._pushes[key] = 0;
  }
  return this._pushes[key]++;
};

FormSerializer.prototype.addPair = function addPair(pair) {
  if (!this._patterns.validate.test(pair.name)) return this;
  var obj = this._makeObject(pair.name, pair.value);
  this._object = this._helper.extend(true, this._object, obj);
  return this;
};

FormSerializer.prototype.addPairs = function addPairs(pairs) {
  if (!this._helper.isArray(pairs)) {
    throw new Error("formSerializer.addPairs expects an Array");
  }
  for (var i=0, len=pairs.length; i<len; i++) {
    this.addPair(pairs[i]);
  }
  return this;
};

FormSerializer.prototype.serialize = function serialize() {
  return this._object
};

FormSerializer.prototype.serializeJSON = function serializeJSON() {
  return JSON.stringify(this.serialize());
};

},{}],2:[function(require,module,exports){
var Helper = module.exports = function Helper(jQuery) {

  // jQuery.extend requirement
  if (typeof jQuery.extend === 'function') {
    this.extend = jQuery.extend;
  }
  else {
    throw new Error("jQuery is required to use jquery-serialize-object");
  }

  // Array.isArray polyfill
  if(typeof Array.isArray === 'function') {
    this.isArray = Array.isArray;
  }
  else {
    this.isArray = function isArray(input) {
      return Object.prototype.toString.call(input) === "[object Array]";
    };
  }

};

},{}],3:[function(require,module,exports){
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

},{"./form-serializer":1,"./helper":2}]},{},[3])
;