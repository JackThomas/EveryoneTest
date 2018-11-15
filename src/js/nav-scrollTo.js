// //==================================================================================================
// //	Navigation Scroll Spy
// //==================================================================================================


// //==================================================================================================
// //	
// // Custom Scroll Spy - for children in different containers
// // 
// //==================================================================================================

// // Cache selectors
// var lastId,
//     topMenu = $(".primary-nav"),
//     topMenuHeight = topMenu.outerHeight() + 15,
//     // All list items
//     menuItems = topMenu.find("a"),
//     // Anchors corresponding to menu items
//     scrollItems = menuItems.map(function () {
//         var item = $($(this).attr("href"));
//         if (item.length) { return item; }
//     });

// // Bind click handler to menu items
// // so we can get a fancy scroll animation
// menuItems.click(function (e) {
//     var href = $(this).attr("href"),
//         offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
//     $('html, body').stop().animate({
//         scrollTop: offsetTop
//     }, 300);
//     e.preventDefault();

//     if($('.nav-dropdown-wrapper').hasClass('active')) {
//         $('body').removeClass('fixed');
//         $('.nav-toggle').removeClass('active');
//         $('.nav-dropdown-wrapper').removeClass('active');
//         $('.navbar').removeClass('open');
//     };
// });

// // Bind to scroll

// $(window).on("load resize scroll", function (e) {
//     // Get container scroll position
//     var fromTop = $(this).scrollTop() + topMenuHeight;

//     // Get id of current scroll item
//     var cur = scrollItems.map(function () {
//         if ($(this).offset().top < fromTop)
//             return this;
//     });
//     // Get the id of the current element
//     cur = cur[cur.length - 1];
//     var id = cur && cur.length ? cur[0].id : "";

//     if (lastId !== id) {
//         lastId = id;
//         // Set/remove active class
//         menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
//     }

//     if ($('.primary-nav .underline').length > 0) {
//         var parent_left = $('li.active').parents('.nav-wrapper').offset().left;
//         var left = $('li.active').offset().left;
//         var width = $('li.active').width();
        
//         $('.primary-nav .underline').css('left', left - parent_left + (width/2) );
//         $('.primary-nav .underline').css('width', width);
//     }
// });