jQuery Serialize Object
=======================

**As seen on StackOverflow: [Convert forms to JSON LIKE A BOSS][SO].**

Adds the method `serializeObject` to jQuery, to perform complex form
serialization into JavaScript objects.

The current implementation relies in `jQuery.serializeArray()` to grab the form
attributes and then create the object using the input `name` attributes.

This means it will serialize the inputs that are supported by
`.serializeArray()`, that use the standard W3C rules for [successful controls][w3c_controls]
to determine which inputs should be included; in particular:

* The input cannot be disabled and must contain a name attribute.
* No submit button value is serialized since the form is not submitted using a button.
* Data from `<input type="file">` inputs are not serialized.


Installation
------------

**option 1: Bower**

```sh
$ bower install jquery-serialize-object
```

**option 2: Manual**

Copy the `dist/jquery-serialize-object.min.js` to your project.

You can include the plugin in the `HEAD` element or at the bottom of your `BODY`
tag. Wherever you choose to add it, it **must** be included after your jQuery.

```html
<head>
  <script src="jquery.min.js"></script>
  <script src="jquery.serialize-object.min.js"></script>
</head>
```

2.0
---

Version 2.0 takes jquery-serialize-object into maturity. It is now backed by a
full test suite so you can be confident that it will work in your web app.

Moving ahead, on top of core serialization, `.serializeObject` will support
correct serializaton for `boolean` and `number` values, resulting valid types
for both cases.

Look forward to these `>= 2.5.0`

**Update:** `>= 2.4.0` now serializes `<input type="checkbox">` as a `boolean`. See
the [test][boolean] for specific behavior.


API
---

Given a basic HTML form

```html
<form id="contact">
  <input name="user[email]" value="jsmith@example.com">
  <input name="user[pets][]" type="checkbox" value="cat" checked>
  <input name="user[pets][]" type="checkbox" value="dog" checked>
  <input name="user[pets][]" type="checkbox" value="bird">
  <input type="submit">
</form>
```

**.serializeObject** &mdash; serializes the selected form into a JavaScript object

```js
$('form#contact').serializeObject();
//=> {user: {email: "jsmith@example.com", pets: ["cat", "dog"]}}
```

**.serializeJSON** &mdash; serializes the selected form into [JSON][json]

```js
$('form#contact').serializeJSON();
//=> '{"user":{"email":"jsmith@example.com","pets":["cat","dog"]}}'
```

**FormSerializer.patterns** &mdash; modify the patterns used to match field
names

Many of you have requested to allow `-` in field names or use `.` to nest keys.
You can now configure these to your heart's content.

[Hyphen][dash-notation] example

```js
$.extend(FormSerializer.patterns, {
  validate: /^[a-z][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_-]+)\])*$/i,
  key:      /[a-z0-9_-]+|(?=\[\])/gi,
  named:    /^[a-z0-9_-]+$/i
});
```

[Dot-notation][dot-notation] example

```js
$.extend(FormSerializer.patterns, {
  validate: /^[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)*(?:\[\])?$/i
});
```

*Validating and Key parsing*

* `validate` &mdash; only valid input names will be serialized; invalid names
  will be skipped

* `key` &mdash; this pattern parses all "keys" from the input name; You will
  want to use `/g` as a modifier with this regexp.

*Key styles*

* `push` &mdash; pushe a value to an array

  ```html
  <input name="foo[]" value="a">
  <input name="foo[]" value="b">
  ```

  ```js
  $("form").serializeObject();
  //=> {foo: [a, b]}
  ```

* `fixed` &mdash; add a value to an array at a specified index

  ```html
  <input name="foo[2]" value="a">
  <input name="foo[4]" value="b">
  ```

  ```js
  $("form").serializeObject();
  //=> {foo: [, , "a", , "b"]}
  ```

* `named` &mdash; adds a value to the specified key

  ```html
  <input name="foo[bar]" value="a">
  <input name="foo[bof]" value="b">
  <input name="hello" value="world">
  ```

  ```js
  $("form").serializeObject();
  //=> {foo: {bar: "a", bof: "b"}, hello: "world"}
  ```

Tests
-----

If you have [node.js][node] installed, as a convenience, you can run

```sh
$ npm test
```

If you do not have node installed, simply

```sh
$ open ./test/test.html
```


CoffeeScript
------------

CoffeeScript has been dropped for `>= 2.0.0`. If members of the community would
like to support this, please feel free to add a CoffeeScript version.

If you'd like to use the the `1.0.0` version, it is still available [here][legacy].


Contributing
------------

All pull requests **must** be backed by tests or they will be rejected.

Once you have finished your changes, build the new plugin:

```sh
$ npm run-script build
```

**Do not** bump the version. I will handle versioning.


[SO]: http://stackoverflow.com/a/8407771/184600
[w3c_controls]: http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2
[json]: http://json.org
[node]: http://nodejs.org
[legacy]: https://github.com/macek/jquery-serialize-object/releases/tag/1.0.0
[dash-notation]: https://github.com/macek/jquery-serialize-object/issues/6
[dot-notation]: https://github.com/macek/jquery-serialize-object/issues/4
[boolean]: https://github.com/macek/jquery-serialize-object/blob/master/test/integration/encode-test.js