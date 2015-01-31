var assert = chai.assert;

describe("patterns", function() {

  var original = $.extend({}, FormSerializer.patterns);

  function resetPatterns() {
    $.extend(FormSerializer.patterns, original);
  }

  it("exposes FormSerializer.patterns", function() {
    var p = FormSerializer.patterns;
    assert.typeOf(p.validate, "regexp");
    assert.typeOf(p.key,      "regexp");
    assert.typeOf(p.push,     "regexp");
    assert.typeOf(p.fixed,    "regexp");
    assert.typeOf(p.named,    "regexp");
  });

  it("override pattern to allow dot notation", function() {
    $.extend(FormSerializer.patterns, {
      validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
    });

    var f = new FormSerializer($);
    f.addPair({name: "a.b.c", value: "d"});
    assert.strictEqual(f.serializeJSON(), '{"a":{"b":{"c":"d"}}}');

    resetPatterns();
  });

  it("override patterns to allow hyphens", function() {
    $.extend(FormSerializer.patterns, {
      validate: /^[a-z][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_-]+)\])*$/i,
      key:      /[a-z0-9_-]+|(?=\[\])/gi,
      named:    /^[a-z0-9_-]+$/i
    });

    var f = new FormSerializer($);
    f.addPair({name: "a-b[c-d]", value: "e"});
    assert.strictEqual(f.serializeJSON(), '{"a-b":{"c-d":"e"}}');

    resetPatterns();
  });

});
