//==================================================================================================
//
// Scroll Reveal
//
//==================================================================================================

import { toArray } from "./helpers/toArray";
import { DOMReady } from "./helpers/DOMReady";
import ScrollReveal from "scrollreveal";

//==================================================================================================
//	DOM ready logic
//==================================================================================================
new DOMReady(function scrollRevealReady() {
    const scrollRevealContainers = toArray(
        document.querySelectorAll("[data-scroll-reveal-container]")
    );

    window.sr = ScrollReveal();
    if (scrollRevealContainers.length > 0) {
        scrollRevealContainers.forEach(function(currentItem) {

            const scrollRevealItems = toArray(
                currentItem.querySelectorAll("[data-scroll-reveal]")
            );

            let itemCount = 0;
            let delay;

            if (scrollRevealItems.length > 0) {
                scrollRevealItems.forEach(function(currentItem) {

                    delay = 150 + itemCount++ * 100;
                    
                    sr.reveal(currentItem, {
                        origin: "bottom",
                        distance: "100px",
                        duration: 1000,
                        delay: delay,
                        viewOffset: {
                            top: 100,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    });
                });
            }
        });
    }
});
