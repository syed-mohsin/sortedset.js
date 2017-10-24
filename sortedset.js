(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.SortedSet = factory();
  }
}(this, function() {
  "use strict";

  // Internal private array which holds actual set elements
  var setArray;

  // Constructor for the SortedSet class
  function SortedSet(initial) {
    if (arguments.length > 0 && initial && initial.length) {
      // TODO: Handle the case when initial array is provided; if array has
      // elements of duplicate value, reduce down to one instance and sort the
      // elements in ascending order.

      setArray = [];
      var duplicates = new Set();

      initial.forEach(function(item) {
        if (!duplicates.has(item)) {

          duplicates.add(item);
          setArray.push(item);
        }
      });

      // sort array after removing duplicates
      setArray.sort(function(a,b) {
        return a - b;
      });
    } else {
      setArray = [];
    }
  }

  /* Accessor; returns element at index
   */
  SortedSet.prototype.at = function(index) {
    return setArray[index];
  };

  /* Converts a set into an Array and returns the result
   */
  SortedSet.prototype.toArray = function() {
    return setArray.slice(0);
  };

  /* Converts a set into a String and returns the result
   */
  SortedSet.prototype.toString = function() {
    return setArray.toString();
  };

  /* Synchronously iterates elements in the set
   */
  SortedSet.prototype.forEach = function(callback, thisArg) {
    if (this === void 0 || this === null ||
        setArray === void 0 || setArray === null) {
      throw new TypeError();
    }

    var t = Object(setArray);
    var len = t.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError();
    }

    var context = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in t) callback.call(context, t[i], i, t);
    }
  };

  /* Read-only property for getting number of elements in sorted set
   */
  Object.defineProperty(SortedSet.prototype, 'length', {
    get: function() {
      return setArray.length;
    }
  });

  /* Returns true if a given element exists in the set
   */
  SortedSet.prototype.contains = function(element) {
    // TODO: Implement contains method

    return setArray.some(function(item) {
      return item === element;
    });
  };

  /* Gets elements between startIndex and endIndex. If endIndex is omitted, a
   * single element at startIndex is returned.
   */
  SortedSet.prototype.get = function(startIndex, endIndex) {
    // TODO: Implement get method
    if (startIndex >= 0 && endIndex >= 0) {
      return setArray.slice(startIndex, endIndex + 1);
    } else if (startIndex >= 0 && startIndex < setArray.length) {
      return setArray[startIndex];
    }
  };

  /* Gets all items between specified value range. If exclusive is set, values
   * at lower bound and upper bound are not included.
   */
  SortedSet.prototype.getBetween = function(lbound, ubound, exclusive) {
    // TODO: Implement getBetween method
    var betweenArr = [];
    var duplicates = new Set();

    setArray.forEach(function(item) {
      if (!duplicates.has(item)) {
        duplicates.add(item);
      // current item is a duplicate
      } else {
        return; // continue to next iteration;
      }

      if (item > lbound && item < ubound) {
        betweenArr.push(item);
      }

      // handle case where non-exclusive
      if (!exclusive && (item === lbound || item === ubound)) {
        betweenArr.push(item);
      }
    });

    return betweenArr;
  };

  /* Adds new element to the set if not already in set
   */
  SortedSet.prototype.add = function(element) {
    // TODO: Implement add method

    if (element && setArray.indexOf(element) === -1) {
      setArray.push(element);

      setArray.sort(function(a,b) {
        return a - b;
      });
    }
  };


  /* BONUS MARKS AWARDED IF IMPLEMENTED
   * Implement an asynchronous forEach function. (See above for synchrnous
   * implementation). This method ASYNCHRONOUSLY iterates through each elements
   * in the array and calls a callback function.
   */

  /* Removes element from set and returns the element
   */
  SortedSet.prototype.remove = function(element) {
    // TODO: Implement remove method
  };

  /* Removes element at index location and returns the element
   */
  SortedSet.prototype.removeAt = function(index) {
    // TODO: Implement removeAt method
  };

  /* Removes elements that are larger than lower bound and smaller than upper
   * bound and returns removed elements.
   */
  SortedSet.prototype.removeBetween = function(lbound, ubound, exclusive) {
    // TODO: Implement removeBetween method
  };

  /* Removes all elements from the set
   */
  SortedSet.prototype.clear = function() {
    // TODO: Implement clear method
    setArray = [];
  };

  SortedSet.prototype.forEachAsync = function(callback, thisArg) {
    // TODO: Implement for bonus marks
  };

  return SortedSet;
}));
