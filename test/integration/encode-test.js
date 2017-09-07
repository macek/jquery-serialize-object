var assert = chai.assert;

describe("encode", function() {

  it("checkbox inputs as booleans if no value is present", function() {
    var $form = $('<form><input type="checkbox" name="a" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: true});
  });

  it("checkbox inputs as strings if other value is present", function() {
    var $form = $('<form><input type="checkbox" name="a" value="b" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: "b"});
  });

  it("checkbox inputs with deep keys don't break", function() {
    var $form = $('<form><input type="checkbox" name="a[b][c]" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: {b: {c: true}}});
  });

  it("checkbox inputs as booleans if value is 'on'", function() {
    var $form = $('<form><input type="checkbox" name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: true});
  });

  it("non-checkbox input as string if value is 'on'", function() {
    var $form = $('<form><input name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: "on"});
  });
  
  it("should pass issue #107", function() {
    var $form1 = $('<form id="f1"><input name="a" type="radio" value="0" checked/><input name="a" type="radio" value="-1"/></form>');
    var $form2 = $('<form id="f2"><input name="a" type="radio" value="1"  checked/><input name="a" type="radio" value="2"/></form>');
    assert.deepEqual($form1.serializeObject(), {a: "0"});
    assert.deepEqual($form2.serializeObject(), {a: "1"});
  });

});
