var assert = chai.assert;

describe("serializeObject", function() {

  it("should convert checkboxes to boolean", function () {
    var expected,
        actual,
        forms = {
          $single: $('<form>' +
                      '<input type="text" name="foo" value="on"/>' +
                      '<input type="checkbox" name="a" checked/>' +
                      '<input type="checkbox" name="x"/>' +
                    '</form>'),
          $multiple: $('<form>' +
                        '<input type="text" name="foo" value="on"/>' +
                        '<input type="checkbox" name="a" checked/>' +
                        '<input type="checkbox" name="b" checked/>' +
                        '<input type="checkbox" name="x"/>' +
                      '</form>'),
          $nested: $('<form>' +
                      '<input type="text" name="foo" value="on"/>' +
                      '<input type="checkbox" name="options[mu][a]" checked/>' +
                      '<input type="checkbox" name="options[mu][b]" checked/>' +
                      '<input type="checkbox" name="options[mu][x]"/>' +
                    '</form>')
        };

    expected = {foo: 'on', a: true};
    actual = forms.$single.serializeObject();
    assert.deepEqual(actual, expected);

    expected = {foo: 'on', a: true, b: true};
    actual = forms.$multiple.serializeObject();
    assert.deepEqual(actual, expected);

    expected = {foo: 'on', options: {mu: {a: true, b: true}}};
    actual = forms.$nested.serializeObject();
    assert.deepEqual(actual, expected);
  });

});
