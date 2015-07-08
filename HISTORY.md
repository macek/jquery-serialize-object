2.5.0
-----
* remove jquery.json file
* add ability to serialize multiple elements

2.4.5
-----
* update example for hyphen notation

2.4.4
-----
* fix uglify-js dependency
* loosen jquery version requirement


2.4.3
-----
* fix location of testing script


2.4.2
-----
* add missing ignore entry to bower.json. wups!

2.4.1
-----
* change deprecated component.json to bower.json
* update license identifier to BSD-3-Clause
* build now puts plugin in /dist
* update jquery dependency to ^1.11.1 in jquery.json

2.4.0
-----
* API: FormSerializer(helper) => FormSerializer(helper, $form)
* move unit tests to test/unit
* encode checkbox inputs as booleans #27

2.3.4
-----
* automatically build before running tests
* allow keys to start with a leading underscore #31
* use markdown for HISTORY

2.3.3
-----
* Use jQuery-1.11.1 in testing for maximum browser compatibility
* Use cdnjs to deliver jQuery for testing
* Patch requirejs bug #30
* Improve formatting of HISTORY

2.3.2
-----
* Rename jquery.json file. wups!

2.3.1
-----
* Add jquery.json for publishing to http://plugins.jquery.com

2.3.0
-----
* IE8 fix

2.2.0
-----
* Expose regexp patterns via FormSerializer.patterns
* Improve legibility of FormSerializer

2.1.0
-----
* Fix #16: .serializeJSON was not properly exposed to jQuery
* Front-end testing with mocha and chai
* Automated build process with uglifyjs
* Removed server-side dependencies
  * browserify
  * mocha
  * jquery-extend

2.0.1
-----
* Removed ECMAScript 5 dependencies
  * Array.prototype.forEach
  * Function.prototype.bind

2.0.0
-----
* Fully backed by tests
* .serializeObject works the same
* .serializeJSON is a new function
* CoffeeScript has been dropped
* Now bundles with browserify
