//==================================================================================================
//
// Navigation Scroll Reveal
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
        document.querySelectorAll("[data-scroll-reveal-section]")
    );
    ScrollReveal.debug = true;

    window.sr = ScrollReveal();
    if (scrollRevealContainers.length > 0) {
        scrollRevealContainers.forEach(function(currentItem) {

            sr.reveal(currentItem, {
                beforeReveal: el => sidebarTrigger(el),
                duration: 0,
                reset: true,
                viewOffset: {
                    top: 200,
                    right: 0,
                    bottom: 200,
                    left: 0
                },
                opacity: 1
            });
        });
    }
});


function sidebarTrigger(el) {
    const sidebarTextArea = document.querySelector(".nav__section-title");

    sidebarTextArea.classList.remove("fade-in");
    
    setTimeout(function () {
        sidebarTextArea.textContent = el.dataset.navigationText;

        sidebarTextArea.classList.add("fade-in");
    }, 300);
}
