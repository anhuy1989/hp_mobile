(function(jQuery) {
    "use strict";

    // Menu off canvas
    // jQuery(".canvas-slid .canvas-container").addEventListener('touchmove', function(e) {
    //     e.preventDefault();
    // }, false);

    // Menu multi level of categories
    jQuery("#navigation").navgoco({
        caretHtml: '',
        accordion: false,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 400,
            easing: 'swing'
        },
        // Add Active class to clicked menu item
        onClickAfter: function(e, submenu) {
            e.preventDefault();
            jQuery('#navigation').find('li').removeClass('active');
            var li = $(this).parent();
            var lis = li.parents('li');
            li.addClass('active');
            lis.addClass('active');
        },
    });



    // Best seller
    jQuery('#js-best-seller').owlCarousel({
        margin: 5,
        responsiveClass: true,
        touchDrag: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                loop: true
            },
            480: {
                items: 2,
                nav: true,
                loop: true
            },
            768: {
                items: 3,
                nav: true,
                loop: true
            },

            1000: {
                items: 4,
                nav: true,
                loop: true
            }
        }
    });

    // Back to top
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 200) {
            jQuery('.back_to_top').fadeIn();
        } else {
            jQuery('.back_to_top').fadeOut();
        }
    });
    jQuery('.back_to_top').click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    // Accordion
    jQuery('.collapse').on('shown.bs.collapse', function() {
        jQuery(this).parent().find(".icon-plus").removeClass("icon-plus").addClass("icon-minus");
    }).on('hidden.bs.collapse', function() {
        $(this).parent().find(".icon-minus").removeClass("icon-minus").addClass("icon-plus");
    });

})(jQuery);