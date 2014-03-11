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

});
