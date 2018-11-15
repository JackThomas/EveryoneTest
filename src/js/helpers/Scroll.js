//==================================================================================================
//
//	Scroll event handler
//  Note: Some work could be done here to allow for handler to be bound to any element
//        At the moment this object only support document scroll.
//
//==================================================================================================

//==================================================================================================
//	Private variables & methods
//==================================================================================================
/**
 * Queue of callbacks to be called when an element's scroll event is fired
 * @private
 * @memberof Scroll
 */
const eventStore = new WeakMap();


//==================================================================================================
//	We will assume if this object is imported the handler should be bound
//==================================================================================================
/**
 * This method returns an event listener, which is then attached to our element.
 * @private
 * @function listener
 * @memberof Scroll
 * @param {HTMLElement} element - Element to which our scroll event should be attached
 */
function listener(element) {
    return function listenerCallback(event) {
        const callbacks = eventStore.get(element);
        callbacks.forEach(function iterateCallbacks(callback) {
            if (callback) {
                callback(event);
            }
        });
    };
}


//==================================================================================================
//	Constructor
//==================================================================================================
/**
 * Wrapper for the browser scroll event.
 * This has the added benefit of only one event handler being bound, and the ability to add/remove individual callbacks to an element
 * @constructor
 * @param {Function} callback - Callback to be added to the scroll event queue
 * @param {HTMLElement} element - Element to which our scroll handler should be bound
 * @property {Function} callback - Local reference to the callback passed on instantiation
 * @property {HTMLElement} callback - Local reference to the element passed on instantiation
 * @property {Function} index - Position of our callback within the scroll event queue
 * @example
 * let callback = function(event) { console.log(event); }
 * let element = document.querySelector(".scrolling");
 * let scroll = new Scroll(callback, element);
 */
export const Scroll = function(callback, element) {
    const scroll = this;

    scroll.callback = callback;
    scroll.element = element ? element : window;
    scroll.index = undefined;

    scroll.init();
};


//==================================================================================================
//	Do our initialisation logic
//==================================================================================================
/**
 * Initial logic to be fired whenever our Scroll object is instantiated
 */
Scroll.prototype.init = function() {
    const scroll = this;

    if (eventStore.get(scroll.element) === undefined) {
        eventStore.set(scroll.element, []);
        scroll.element.addEventListener("scroll", listener(scroll.element), true);
    }

    if (scroll.callback) {
        scroll.index = eventStore.get(scroll.element).length;
        scroll.attach();
    }
};


//==================================================================================================
//	Method for adding the callback from this instance of scroll to the queue
//==================================================================================================
/**
 * Attaches our event handler to the element
 * This is done automatically when the Scroll object is instantiated
 */
Scroll.prototype.attach = function() {
    const scroll = this;
    const callbacks = eventStore.get(scroll.element);

    callbacks[scroll.index] = scroll.callback;

    return scroll;
};


//==================================================================================================
//	Method for removing the callback from the queue
//==================================================================================================
/**
 * Detaches our callback from the element's scroll event
 */
Scroll.prototype.detach = function() {
    const scroll = this;
    const callbacks = eventStore.get(scroll.element);

    callbacks[scroll.index] = undefined;

    return scroll;
};


//==================================================================================================
//	Expose our private queue array
//==================================================================================================
/**
 * Exposes our private callback map
 * @returns {WeakMap} - Callback map
 */
Scroll.prototype.getCallbacks = function() {
    const scroll = this;
    return eventStore.get(scroll.element);
};
