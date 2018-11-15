//==================================================================================================
//
//	Convert an array-like object to an array
//
//==================================================================================================

/**
 * @module module:toArray
 * @see https://www.safaribooksonline.com/library/view/javascript-the-definitive/9781449393854/ch07s11.html
 */

/**
 * Convert an array-like object to an array
 * @function
 * @param {Object} obj - Array-like object to be converted
 * @returns {Array}
 * @example
 * let collection = toArray(document.querySelectorAll("div"));
 */

export const toArray = function(obj) {

    if (obj && obj.length !== undefined) {
        return Array.prototype.slice.call(obj, 0);
    }

    return [obj];
};