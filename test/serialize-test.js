var assert         = require("assert"),
    helper         = require("./helper"),
    FormSerializer = require("../lib/form-serializer");

describe("serialize", function() {

  it("should return the object", function() {
    var f = new FormSerializer(helper);
    assert.deepEqual(f.serialize(), {});
  });
  
});
