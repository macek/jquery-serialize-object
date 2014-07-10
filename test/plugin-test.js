var assert = chai.assert;

describe("jQuery plugin", function() {

  it("$.fn.serializeObject is setup", function() {
    assert.strictEqual(typeof $.fn.serializeObject, "function");
    assert.strictEqual($.fn.serializeObject, FormSerializer.serializeObject);
  });

  it("$.fn.serializeJSON is setup", function() {
    assert.strictEqual(typeof $.fn.serializeJSON, "function");
    assert.strictEqual($.fn.serializeJSON, FormSerializer.serializeJSON);
  });

  it("exposes FormSerializer.patterns", function() {
    var p = FormSerializer.patterns;
    assert.typeOf(p.validate, "regexp");
    assert.typeOf(p.key,      "regexp");
    assert.typeOf(p.push,     "regexp");
    assert.typeOf(p.fixed,    "regexp");
    assert.typeOf(p.named,    "regexp");
  });

  it("Override pattern using dot notation", function() {
    var form = $('<form><input name="a.b.c" value="d" />');

    assert.deepEqual(form.serializeObject(), {});

    $.extend(FormSerializer.patterns, {
      validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
    });

    assert.deepEqual(form.serializeObject(), { a: { b: { c: 'd' } } });
  });

  it("Override patterns allowing hyphens", function() {
    var form = $('<form><input name="a-b[c]" value="d" />');

    assert.deepEqual(form.serializeObject(), {});

    $.extend(FormSerializer.patterns, {
      validate: /^[a-z][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
      key:      /[a-z0-9_-]+|(?=\[\])/gi,
      named:    /^[a-z0-9_-]+$/i
    });

    assert.deepEqual(form.serializeObject(), { 'a-b': { c: 'd' } });
  });

});
