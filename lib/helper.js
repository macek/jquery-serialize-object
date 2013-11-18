var Helper = module.exports = function Helper(jQuery) {

  // jQuery.extend and jQuery.each requirement
  if (typeof jQuery.extend === 'function' && typeof jQuery.each === 'function') {
    this.extend = jQuery.extend;
    this.each = jQuery.each;
  }
  else {
    throw new Error("jQuery is required to use jquery-serialize-object");
  }

  // Array.isArray polyfill
  if(typeof Array.isArray === 'function') {
    this.isArray = Array.isArray;
  }
  else {
    this.isArray = function isArray(input) {
      return Object.prototype.toString.call(input) === "[object Array]";
    };
  }

};
