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
