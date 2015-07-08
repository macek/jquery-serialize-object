var assert = chai.assert;

describe("selector", function() {

  it("seriazlie a single form", function() {
    var $form = $('<form><input name="a" value="1"><input name="b" value="2"</form>');
    assert.deepEqual($form.serializeObject(), {a: "1", b: "2"});
  });

  it("serialize multiple forms", function() {
    var $forms = $('\
      <form><input name="a" value="1"><input name="b" value="2"</form>\
      <form><input name="c" value="3"><input name="d" value="4"</form>\
    ');
    assert.deepEqual($forms.serializeObject(), {a: "1", b: "2", c: "3", d: "4"});
  });

  it("serialize a selection of inputs", function() {
    var $div = $('<div><input name="a" value="1"><input name="b" value="2"</div>');
    var $inputs = $div.find(':input');
    assert.deepEqual($inputs.serializeObject(), {a: "1", b: "2"});
  });

});
