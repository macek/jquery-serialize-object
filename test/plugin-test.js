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

});
