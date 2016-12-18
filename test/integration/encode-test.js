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

  it("checkbox inputs as booleans if encode option turned on", function() {
    var $form = $('<form><input type="checkbox" name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject({'encodes': { 'checkbox': true } }), {a: true});
  });

  it("checkbox inputs as strings if encode option turned off", function() {
    var $form = $('<form><input type="checkbox" name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject({'encodes': { 'checkbox': false } }), {a: "on"});
  });

  it("checkbox inputs as booleans if encode option not provided", function() {
    var $form = $('<form><input type="checkbox" name="a" value="on" checked></form>');
    assert.deepEqual($form.serializeObject(), {a: true});
  });

  it("number inputs as numbers if encode option turned on", function() {
    var $form = $('<form><input type="number" name="a" value="6"></form>');
    assert.deepEqual($form.serializeObject({'encodes': { 'number': true } }), {a: 6});
  });

  it("number inputs as strings if encode option turned off", function() {
    var $form = $('<form><input type="number" name="a" value="6"></form>');
    assert.deepEqual($form.serializeObject({'encodes': { 'number': false } }), {a: "6"});
  });

  it("number inputs as strings if encode option not provided", function() {
    var $form = $('<form><input type="number" name="a" value="6"></form>');
    assert.deepEqual($form.serializeObject(), {a: "6"});
  });

  it("number inputs as empty strings if encode option turned on but empty field", function() {
    var $form = $('<form><input type="number" name="a" value=""></form>');
    assert.deepEqual($form.serializeObject({'encodes': { 'number': true } }), {a: ""});
  });

});
