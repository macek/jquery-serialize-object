var assert = chai.assert;

describe("serializeJSON", function() {

  it("should return the object", function() {
    var f = new FormSerializer($);
    f.addPair({name: "a[b]", value: "c"});
    f.addPair({name: "a[x]", value: "y"});
    assert.deepEqual(f.serializeJSON(), '{"a":{"b":"c","x":"y"}}');
  });

});
