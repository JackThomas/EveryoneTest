//==================================================================================================
//
//	DOM Ready event handler
//
//==================================================================================================

//==================================================================================================
//	Private variables
//==================================================================================================
/**
 * Array of methods to be called on DOMContentLoaded
 * @private
 * @memberof DOMReady
 */
let callbacks = [];

/**
 * Boolean to indicate whether DOMContentLoaded state has been reached
 * @private
 * @memberof DOMReady
 */
let ready = false;


//==================================================================================================
//	Constructor
//==================================================================================================
/**
 * Wrapper object for DOM ready
 * @constructor
 * @param {Function} callback - Method to be called on DOM ready
 * @property {Function} callback - Cached property of our event
 * @example
 * new DOMReady(function myLogic() {
 *  // Logic here
 * });
 */
export const DOMReady = function(callback) {
    const dom = this;
    dom.callback = callback;
    if (callback) {
        dom.init();
    }
};


//==================================================================================================
//	Init method for firing or attaching our ready callbacks
//==================================================================================================
/**
 * Init method for firing or attaching our ready callbacks
 * If we have already reached DOMContentLoaded, the callback is fired immediately
 */
DOMReady.prototype.init = function() {
    const dom = this;
    if (ready === false) {
        callbacks.push(dom.callback);
    }
    else {
        dom.callback();
    }
};


//==================================================================================================
//	Expose our private variable which reflects whether the page has reached DOM ready
//==================================================================================================
/**
 * Expose our private variable which reflects whether the page has reached DOMContentLoaded
 */
DOMReady.prototype.isReady = function() {
    return ready;
};


//==================================================================================================
//	We will assume if this object is imported the handler should be bound
//==================================================================================================
/**
 * Listener attached to the document to wait for DOMContentLoaded
 * We will assume if this module has been imported the handler should be bound to the document
 * @private
 * @function listener
 * @memberof DOMReady
 * @param {Event} event - The event object passed to our event handler
 */
function listener(event) {
    ready = true;
    callbacks.forEach(function iterate(callback) {
        callback(event);
    });
    callbacks = [];
    event.preventDefault();
}
document.addEventListener("DOMContentLoaded", listener, true);