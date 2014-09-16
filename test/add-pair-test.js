var assert = chai.assert;

describe("addPair", function() {

  var f;
  beforeEach(function() {
    f = new FormSerializer($);
  });

  it("should merge a named field", function() {
    f.addPair({name: "a", value: "b"});
    assert.deepEqual(f.serialize(), {a: "b"});
  });

  it("should merge a nested named field", function() {
    f.addPair({name: "a[b]", value: "c"});
    assert.deepEqual(f.serialize(), {a: {b: "c"}});
  });

  it("should merge a deeply nested named field", function() {
    f.addPair({name: "a[b][c][d]", value: "e"});
    assert.deepEqual(f.serialize(), {a: {b: {c: {d: "e"}}}});
  });

  it("should merge a push array field", function() {
    f.addPair({name: "a[]", value: "1"});
    f.addPair({name: "a[]", value: "2"});
    f.addPair({name: "a[]", value: "3"});
    assert.deepEqual(f.serialize(), {a: ["1", "2", "3"]});
  });

  it("should merge a fixed array field", function() {
    f.addPair({name: "a[3]", value: "b"});
    assert.deepEqual(f.serialize(), {a: [ , , , "b"]});
  });

  it("should merge multiple fixed fields", function() {
    f.addPair({name: "a[1]", value: "b"});
    f.addPair({name: "a[3]", value: "c"});
    assert.deepEqual(f.serialize(), {a: [ , "b", , "c"]});
  });

  it("should merge mixed field types; named,push", function() {
    f.addPair({name: "a[b][]", value: "c"});
    f.addPair({name: "a[b][]", value: "d"});
    assert.deepEqual(f.serialize(), {a: {b: ["c", "d"]}});
  });

  it("should punish user for mixing pushed array and fixed array fields", function() {
    f.addPair({name: "a[]",  value: "b"});
    f.addPair({name: "a[2]", value: "c"});
    f.addPair({name: "a[]",  value: "d"});
    f.addPair({name: "a[5]", value: "e"});
    assert.deepEqual(f.serialize(), {a: ["b", "d", "c", , , "e"]});
  });

  it("should allow a key to start with a leading underscore", function() {
    f.addPair({name: "_method", value: "post"});
    assert.deepEqual(f.serialize(), {_method: "post"});
  });

});
