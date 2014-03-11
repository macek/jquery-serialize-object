var assert = chai.assert;

describe("serialize", function() {

  it("should return the object", function() {
    var f = new FormSerializer($);
    assert.deepEqual(f.serialize(), {});
  });

});
