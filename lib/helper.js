var Helper = module.exports = function Helper(jQuery) {

  // jQuery.extend requirement
  if (typeof jQuery.extend === 'function') {
    this.extend = jQuery.extend;
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
