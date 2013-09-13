Jquery Serialize Object
=======================

Adds the method serializeObject to jQuery, to perform complex form serialization into Javascript Objects, based on Ruby on Rails params hash.

Usage Example
-------------

HTML form (input, textarea and select tags supported):

```html

<form id="user-form">
  <!-- simple attribute -->
  <input type="text" name="name"              value="Daniel " />

  <!-- object -->
  <input type="text" name="address[city]"         value="Bogotá" />
  <input type="text" name="address[state][name]"  value="Capital District" />
  <input type="text" name="address[state][abbr]"  value="DC" />

  <!-- array -->
  <input type="text" name="hobbies[]"             value="programming" />
  <input type="text" name="hobbies[]"             value="running" />

  <!-- array of objects -->
  <input type="text" name="projects[0][name]"     value="serializeObject" />
  <input type="text" name="projects[0][language]" value="javascript" />

  <!-- booleans and integers -->
  <input type="text" name="supports_boolean" value="true" />
  <input type="text" name="random_number" value="126884" />

</form>

```

```javascript

// user =>
{
  name: "Daniel",

  address: {
    city: "Bogotá",
    state: {
      name: "Capital District",
      abbr: "DC"
    }
  },

  hobbies: ["programming", "running"],

  projects: [
    { name: "serializeObject", language: "javascript" },
  ]

  suppors_boolean: true,

  random_number: 126884

}

```

Usage details
-------------

Current implementation of `.serializeObject()` relies in jQuery `.serializeArray()` to grab the form attributes and then create the object using the names.

It means, it will serialize the inputs that are supported by `.serializeArray()`, that uses the standard W3C rules for [successful controls](http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2) to determine which elements it should include; in particular the element cannot be disabled and must contain a name attribute. No submit button value is serialized since the form was not submitted using a button. Data from file select elements is not serialized.

On top of core Serialization, `.serializeObject()` serialize object supports correct serializaton for boolean and numbers, resulting valid types for both cases.




