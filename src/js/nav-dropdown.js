//==================================================================================================
//	Navigation onClick Toggle
//==================================================================================================


//==================================================================================================
//	
// Mobile Navigation tigger & submenu trigger
// 
//==================================================================================================

var trigger = document.querySelector(".nav__toggle");
var body = document.querySelector("body");
var navigation = document.querySelector(".navigation");
var navigationDropdown = document.querySelector(".navigation-dropdown");

trigger.addEventListener("click", function(event) {
    event.preventDefault();

    trigger.classList.toggle("active");
    body.classList.toggle("fixed");
    navigation.classList.toggle("active");
    navigationDropdown.classList.toggle('active');
}, false );