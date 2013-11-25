# jQuery Serialize Object

###### As seen on StackOverflow: [Convert forms to JSON LIKE A BOSS][SO].

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


## 2.0

Version 2.0 takes jquery-serialize-object into maturity. It is now backed by a
full test suite so you can be confident that it will work in your web app.

Moving ahead, on top of core serialization, `.serializeObject` will support
correct serializaton for `boolean` and `number` values, resulting valid types
for both cases.

Look forward to these in `>= 2.1.0`


## API

Given a basic HTML form

```html
<form id="contact">
  <input name="user[email]" value="jsmith@example.com">
  <input name="user[pets][]" type="checkbox" value="cat" checked>
  <input name="user[pets][]" type="checkbox" value="dog" checked>
  <input name="user[pets][]" type="checkbox" value="bird" checked>
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


## Tests

To run the tests, you will need [node.js][node] and [mocha][mocha].

```sh
$ npm install
$ npm test
```


## CoffeeScript

CoffeeScript has been dropped for `>= 2.0.0`. If members of the community would
like to support this, please feel free to add a CoffeeScript version.

If you'd like to use the the `1.0.0` version, it is still available [here][legacy].


## Contributing

jquery-serialize-object utilizes [browserify][browserify] to keep great
code composition in the core, facilitate testing, and prevent source code
duplication.

To start developing, you will first need to install the development
dependencies:

```sh
$ npm install
```

Changes will primarily happen in `lib/form-serialier.js`, but feel free to take
a peek at `lib/plugin.js` to see how it integrates with jQuery.

Once you have finished your changes, build the new plugin:

```sh
$ npm run-script browserify
```

All pull requests **must** be backed by tests or they will be rejected.
Additionally, please update the compiled file using [Google Closure Compiler][compiler].
There is not an automated process for updating this file yet. The following
compiler settings should be used

```js
// ==ClosureCompiler==
// @output_file_name jquery.serialize-object.compiled.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==
```

[SO]: http://stackoverflow.com/a/8407771/184600
[w3c_controls]: http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2
[json]: http://json.org
[node]: http://nodejs.org
[mocha]: http://visionmedia.github.io/mocha/
[legacy]: https://github.com/macek/jquery-serialize-object/releases/tag/1.0.0
[browserify]: https://github.com/substack/node-browserify
[compiler]: http://closure-compiler.appspot.com
