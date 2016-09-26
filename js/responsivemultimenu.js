/*

Responsive Mobile Menu v1.1
Plugin URI: responsivemultimenu.com

Author: Adam Wysocki
Author URI: http://oncebuilder.com
Customize: Hieu Tran - hieutranagi47@gmail.com
License: http://opensource.org/licenses/MIT

*/

// Must re-filled $filter after reload page, we can use Session
var $filter = { filter: {}, filterOption: false };
var $current_filter = '';
var $arr_curr = new Array();

function adaptMenu() {
    /* 	toggle menu on resize */
    $('.rmm').each(function() {
        // initialize vars
        var maxWidth = 0;
        var width = 0;

        // width of menu list (non-toggled)
        $('.rmm-menu').children("li").each(function() {
            if ($(this).parent().hasClass('rmm-menu')) {
                width = $(this).outerWidth(); //outerWidth();
                if (width > 0) {
                    maxWidth += width;
                }
            }
        });

        // compare width
        var width = $('.rmm').css('max-width');
        width = width.replace('px', '');

        if ($(this).parent().width() > width) {
            $('.rmm-menu').removeClass("rmm-mobile");

            //remove all classes from mobile verion
            $(".rmm-menu ul").removeClass("rmm-subview");
            $(".rmm-menu li").removeClass("rmm-subover-hidden");
            $(".rmm-menu li").removeClass("rmm-subover-visible");
            $(".rmm-menu a").removeClass("rmm-subover-header");

            $(".rmm-toggled").removeClass("rmm-closed");
            $('.rmm-toggled').hide();

            //$('.rmm-toggled').removeClass("rmm-view");
            //$('.rmm-toggled').addClass("rmm-closed");
        } else {
            $('.rmm-menu').addClass("rmm-mobile");
            $('.rmm-toggled').show();
            $('.rmm-toggled').addClass("rmm-closed");

            //$('.rmm-toggled').removeClass("rmm-closed");
        }
    });
}

function responsiveMultiMenu() {
    $('.rmm').each(function() {
        // create mobile menu classes here to light up HTML
        $(this).find("ul").addClass("rmm-submenu");
        $(this).find("ul:first").addClass("rmm-menu");
        $(this).find("ul:first").removeClass("rmm-submenu");
        $(this).find('.rmm-submenu').prepend('<li class="rmm-back"><a href="#">back</a></li>');
        $(this).find("ul").prev().addClass("rmm-dropdown");

        // initialize vars
        var maxWidth = 0;
        var width = 0;

        // width of menu list (non-toggled)
        $('.rmm-menu').children("li").each(function() {
            if ($(this).parent().hasClass('rmm-menu')) {
                width = $(this).outerWidth(); //outerWidth();
                if (width > 0) {
                    maxWidth += width;
                }
                console.log(width)
            }
        });

        if ($.support.leadingWhitespace) {
            $(this).css('max-width', (maxWidth + 5) + 'px');
        } else {
            $(this).css('width', (maxWidth + 5) + 'px');
        }

        // create dropdown button
        var str = ''
        str += '<div class="rmm-toggled rmm-view rmm-closed">'
        str += '<div class="rmm-toggled-controls">'
        str += '<div class="rmm-toggled-title">Menu</div>';
        str += '<div class="rmm-toggled-button"><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>';
        str += '</div>';
        str += '</div>';

        $(this).prepend(str);
    });

    // click interacts in mobile wersion
    $('.rmm-dropdown').click(function(e) {
        //Set current page state of filter
        $filter.filterOption = true;
        redirectBtnControl();

        $current_filter = $(this).attr('value');
        console.log($filter.filter[$current_filter]);
        if ($filter.filter[$current_filter] !== undefined) {
            $arr_curr = $filter.filter[$current_filter];
            console.log("Here");
            //for each checkbox to re checked it automatically after reset.
        }

        // console.log(jQuery("ul.rmm-subview li:not(.rmm-back) input[type=checkbox]").attr('id'));
        // $('.rmm-subview>li').each(function(i, obj) {
        //     console.log("Nayf");
        // });

        console.log($current_filter);
        if ($(this).parents(".rmm-menu").hasClass('rmm-mobile')) {
            e.preventDefault();
            e.stopPropagation();

            $(this).next().addClass("rmm-subview");

            var index = $(this).parent().index();

            var i = 0;
            $(this).parent().parent().children("li").each(function() {
                if (index == $(this).index()) {
                    $(this).removeClass("rmm-subover-hidden");
                    $(this).addClass("rmm-subover-visible");
                } else {
                    $(this).removeClass("rmm-subover-visible");
                    $(this).addClass("rmm-subover-hidden");
                }
            });
            $(this).addClass("rmm-subover-header");
        }
    });

    // Check/uncheck
    $("input[type=checkbox]").click(function() {
        var smallObj, newText;
        smallObj = $(this).parent().parent().parent().children("a").children("small");
        newText = smallObj.text();
        myTxt = $(this).parent().children("label").text();
        if ($(this).is(':checked') == true) {
            $arr_curr.push($(this).val());
            if (newText.trim().length > 0)
                newText = newText + ", " + myTxt;
            else
                newText = myTxt;
            smallObj.text(newText);
        } else {
            // $arr_curr = spliceValueInArray($arr_curr, $(this).val());
            var index = $arr_curr.indexOf($(this).val());
            console.log(index);
            if ($arr_curr.length > 0 && index !== -1)
                $arr_curr.splice(index, 1);

            if (newText.indexOf(", ") !== -1) {
                newText = newText.replace(', ' + myTxt, '');
                newText = newText.replace(myTxt + ",", '');
                newText = newText.replace(myTxt, '');
            } else {
                newText = "";
            }
            smallObj.text(newText);
        }
        console.log($arr_curr);
    })

    $('.fr-clean').click(function() {
        $arr_curr = [];
        console.log($arr_curr);
        $('.rmm-submenu.rmm-subview').find('li>input[type=checkbox]:checked').attr('checked', false);

    })

    $('.fr-done').click(function() {
        if ($arr_curr.length == 0) {
            delete $filter.filter[$current_filter];
        } else {
            $filter.filter[$current_filter] = $arr_curr;
        }
        console.log($filter);
        $current_filter = '';
        $arr_curr = [];
        $('.rmm-back a').parent().parent().prev().removeClass("rmm-subover-header");
        $('.rmm-back a').parent().parent().removeClass("rmm-subview");
        $('.rmm-back a').parent().parent().parent().parent().find("li").removeClass("rmm-subover-hidden");
        $filter.filterOption = false;
        redirectBtnControl();
        return false; // Prevent close modal when choose back options.
    })

    $('.fr-clean-all').click(function() {
        $filter.filter = {};
        $('.rmm-submenu li input[type=checkbox]').attr('checked', false);
        $('li>a.collapse>small').text('');
    })

    $('.fr-apply').click(function() {
        alert("Apply me???");
    })

    // click back interacts in mobile version
    $('.rmm-back a').click(function() {
        $(this).parent().parent().prev().removeClass("rmm-subover-header");
        $(this).parent().parent().removeClass("rmm-subview");
        $(this).parent().parent().parent().parent().find("li").removeClass("rmm-subover-hidden");
        redirectBtnControl();
        return false; // Prevent close modal when choose back options.
    });

    $('.fr-go-back').click(function() {
        console.log('Back');
    })

    // click toggler interacts in mobile version
    $('.rmm-toggled, .rmm-toggled .rmm-button').click(function() {
        if ($(this).is(".rmm-closed")) {
            $(this).removeClass("rmm-closed");
        } else {
            $(this).addClass("rmm-closed");
        }
    });
}

function redirectBtnControl() {
    if ($filter.filterOption == true) {
        jQuery('.fr-filter-opts').css('display', 'block');
        jQuery('.fr-filter-apply').css('display', "none");
        jQuery('.fr-filter-home').css('display', "none");
    } else if ($filter.filterOption == false && Object.keys($filter.filter).length > 0) {
        jQuery('.fr-filter-opts').css('display', 'none');
        jQuery('.fr-filter-apply').css('display', "block");
        jQuery('.fr-filter-home').css('display', "none");
    } else {
        jQuery('.fr-filter-opts').css('display', 'none');
        jQuery('.fr-filter-apply').css('display', "none");
        jQuery('.fr-filter-home').css('display', "block");
    }
}

jQuery(window).load(function() {
    responsiveMultiMenu();
    adaptMenu();
    redirectBtnControl();
});


$(window).resize(function() {
    adaptMenu();
});