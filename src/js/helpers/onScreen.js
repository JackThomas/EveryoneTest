//==================================================================================================
//
//	Check element is on screen
//
//==================================================================================================

export const onScreen = function(elem) {

    let visible = false;

    if (elem.getBoundingClientRect().bottom <= window.innerHeight && elem.getBoundingClientRect().bottom > 0 || elem.getBoundingClientRect().top <= window.innerHeight && elem.getBoundingClientRect().top > 0) {
        visible = true;
    }

    return visible;
};