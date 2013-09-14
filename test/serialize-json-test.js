var assert         = require("assert"),
    helper         = require("./helper"),
    FormSerializer = require("../lib/form-serializer");

describe("serializeJSON", function() {
  
  it("should return the object", function() {
    var f = new FormSerializer(helper);
    f.addPair({name: "a[b]", value: "c"});
    f.addPair({name: "a[x]", value: "y"});
    assert.deepEqual(f.serializeJSON(), '{"a":{"b":"c","x":"y"}}');
  });

});
