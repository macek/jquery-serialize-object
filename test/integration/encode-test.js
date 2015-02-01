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

  it("checkbox inputs as array don't break", function() {
    var $form = $('<form><input type="checkbox" name="a[]" value="c" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: ["c"] });
  });

  it("checkbox inputs as nested arrays don't break", function() {
    var $form = $('<form><input type="checkbox" name="a[][b][]" value="c" checked><input type="checkbox" name="a[][b][]" value="d"></form>');
    assert.deepEqual($form.serializeObject(), {a: [ { b: ["c"]}]});
  });

  it("crazy nested arrays don't break", function() {
    var $form = $('<form><input name="a[][b]" value="1"><input name="a[][c][]" value="2"><input name="a[][c][]" value="3"><input name="a[][b]" value="4"><input name="a[][c][]" value="5"><input name="a[][c][]" value="6"></form>');
    assert.deepEqual($form.serializeObject(), {a: [ { b: "1", c: ["2", "3"] }, { b: "4", c: ["5", "6"] } ]});
  });

  it("checkbox inputs as nested arrays with a sibling don't break", function() {
    var $form = $('<form><input type="checkbox" name="a[][b][]" value="c" checked><input name="a[][d]" value="e" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: [ { b: ["c"], d: 'e' } ]});
  });

  it("checkbox inputs as booleans if value is 'on'", function() {
    var $form = $('<form><input type="checkbox" name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: true});
  });

  it("non-checkbox input as string if value is 'on'", function() {
    var $form = $('<form><input name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: "on"});
  });

})
