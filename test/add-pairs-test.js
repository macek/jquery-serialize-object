var assert         = require("assert"),
    helper         = require("./helper"),
    FormSerializer = require("../lib/form-serializer");

describe("addPairs", function() {

  var f;
  beforeEach(function() {
    f = new FormSerializer(helper);
  });

  it("should accept an array of pairs", function() {
    f.addPairs([
      {name: "a", value: "b"},
      {name: "c", value: "d"},
      {name: "e", value: "f"}
    ]);
    assert.deepEqual(f.serialize(), {a: "b", c: "d", e: "f"});
  });

  it("should throw an error if an array is not used", function() {
    assert.throws(function(){
      f.addPairs(100);
    }, Error);
  });

});
