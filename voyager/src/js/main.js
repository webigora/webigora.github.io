$(document).ready(function() {

    /* Toggle mobile navbar */
    $(document).on('click', '.header_navbar_toggle', function(event) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.header').removeClass('active');
            $.scrollLock(false);
        }
        else {
            $(this).addClass('active');
            $('.header').addClass('active');
            $.scrollLock(true);
        }    
    });

    $(window).resize(function(event) {
        if ($('.header_navbar_toggle').is(':hidden')) {
            $('.header_navbar_toggle').removeClass('active');
            $('.header').removeClass('active');
            $.scrollLock(false);
        }
    });

    /* Dropdown menu */
    $('.header_has_submenu').on('mouseover', function(event) {
        $('.header_has_submenu').removeClass('opened');
        $(this).addClass('opened');
    });

    $('.header_has_submenu').on('mouseleave', function(event) {
        $('.header_has_submenu').removeClass('opened');
    });

    $('.header_has_submenu').on('click', '> a', function(event) {
        if ($(window).outerWidth() <= 1200) {
            event.preventDefault();
        }
        
        $(this).closest('.header_has_submenu').addClass('visible');
        $('.header_main_nav').addClass('submenu_visible');
    });

    $('.header_submenu_back').on('click', function(event) {
        $(this).closest('.header_has_submenu').removeClass('visible');
        $('.header_main_nav').removeClass('submenu_visible');
    });

    $('.header_submenu_close').on('click', function(event) {
        $(this).closest('.header_has_submenu').removeClass('visible');
        $('.header_main_nav').removeClass('submenu_visible');

        $('.header_navbar_toggle').removeClass('active');
        $('.header').removeClass('active');
        $.scrollLock(false);
    });

    /* Fixed header */
    $(window).on('scroll', function(event) {
        if (typeof $('body').data('scrollval') === 'undefined') {
            $('body').data('scrollval', 0);
        } 

        if ($(window).scrollTop() > $('body').data('scrollval') && $(window).scrollTop() > 0) {
            $('.header').addClass('header_down'); 
            $('.header').removeClass('header_fixed');
        }
        else if ($(window).scrollTop() < $('body').data('scrollval')) {
            $('.header').addClass('header_fixed');
        }

        if ($(window).scrollTop() == 0) {
            $('.header').removeClass('header_fixed header_down'); 
        }

        $('body').data('scrollval', $(window).scrollTop());
    });

    /* Accordion */
    if ($('.accordion_section').length) {
        $('.accordion_section').on('click', '.accordion_trigger', function(event) {
            if (!$(this).hasClass('active')) {
                $(this).closest('.accordion_section').find('.accordion_container').slideUp('slow').siblings('.accordion_trigger').removeClass('active');
                $(this).addClass('active').next().slideDown('slow');
            }
            else {
                $(this).removeClass('active').next().slideUp('slow');
            }
        });
    }

    /* Styler form */
    if ($('.select_style').length) {
        $('.select_style').styler({
            selectSmartPositioning: false
        });
    }

    if ($('.select_search').length) {
        $('.select_search').styler({
            selectSmartPositioning: false,
            selectSearch: true,
            selectSearchNotFound: 'No Results',
            selectSearchLimit: 1,
            selectSearchPlaceholder: 'Search …'
        });
    }

    /* Validate forms */
	$('.contacts_form, .request_form').find('form').each(function(index, el) {
        $(this).validate();
        
        $(this).find('.contact_form_name').rules('add', { 
            required: true,  
            minlength: 2,
            messages: {
                required: 'Error message'
            }
        });
    
        $(this).find('.contact_form_lastname').rules('add', { 
            required: true,  
            minlength: 2,
            messages: {
                required: 'Error message'
            }
        });
    
        $(this).find('.contact_form_email').rules('add', { 
            required: true,
            email: true,
            messages: {
                required: 'Error message',
                email: 'Please enter a valid email address'
            }
        });
    
        $(this).find('.contact_form_phone').rules('add', { 
            required: true,  
            minlength: 10,
            messages: {
                required: 'Error message'
            }
        });
    
        $(this).find('.contact_form_company').rules('add', { 
            required: true,
            messages: {
                required: 'Error message'
            }
        });
    
        $(this).find('.contact_form_country').rules('add', { 
            required: true,
            messages: {
                required: 'Error message'
            }
        });
    });

    /* Slider */
    if ($('.article_slider').length) {
        $('.article_slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$('.article_slider_index').text(i);
			$('.article_slider_length').text(slick.slideCount);
        });
        
        $('.article_slider').slick({
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 1,
            arrows: true,
            dots: false,
            prevArrow: $('.article_slider_prev'),
            nextArrow: $('.article_slider_next')
        });
    }

    /* Popup */
    $('body').on('click', '.popup_show', function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        $(id).fadeIn();
        $.scrollLock(true);
    });

    $('body').on('click', '.popup_fade', function(event) {
        if (!$(event.target).closest($('.popup_center')).length) {
            $(this).closest('.popup_fade').fadeOut();
            $.scrollLock(false);

            if ($(this).find('.popup_video_box').length) {
                $(this).find('.popup_video_box').find('iframe').each(function() {
                    this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                });
            }  
        } 
    });

    $('body').on('click', '.popup_close', function(event) {
        event.preventDefault();
        $(this).closest('.popup_fade').fadeOut();
        $.scrollLock(false);

        if ($(this).closest('.popup_fade').find('.popup_video_box').length) {
            $(this).closest('.popup_fade').find('.popup_video_box').find('iframe').each(function() {
                this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            });
        }
    });

    /* Sticky table header */
    const stickyElems = document.querySelectorAll('.package_table_header')

    const observer = new IntersectionObserver( 
        ([e]) => {
            stickyElems.forEach(function(item, i, arr) {
                item.classList.toggle('sticky', e.intersectionRatio < 1)
            });
        },
        {threshold: [1]}
    );

    stickyElems.forEach(section => {
        observer.observe(section);
    });

    /* Scroll menu */
    $('.header_nav_scroll').on('click', 'a', function(event) {
        event.preventDefault();

        $.scrollLock(false);
        $('.header_navbar_toggle').removeClass('active');
        $('.header').removeClass('active');

        var href = $(this).attr('href'),
            top = $(href).offset().top;
        $('body, html').animate({scrollTop: top}, 300);
    });

    /* Upload file */
    function uploadFile(elem, uploadFiles) {
        var that = elem,
            filesLength = uploadFiles.length,
            thisWrap = that.closest('.contact_form_file');
            
        var reader = new FileReader();

        function readFile(index) {
			if (index >= filesLength) return;
			var file = uploadFiles[index];

            reader.onloadstart = function(e) {
                thisWrap.find('.form_file_name').remove();
                thisWrap.find('.form_file_progress').addClass('visible');
            };              

            reader.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percent = parseInt(((e.loaded / e.total) * 100), 10);
                    thisWrap.find('.form_file_progress').find('span').css('width', percent+'%');
                }
            };

            reader.onload = function(e) {
                thisWrap.find('.form_file_line').append('<p class="form_file_name">'+file.name+'</p>');
            };
            
            reader.readAsDataURL(file);

            reader.onloadend = function(e) {
                thisWrap.find('.form_file_progress').removeClass('visible');
                thisWrap.find('.form_file_progress').find('span').css('width', '0');
            };
		}

		readFile(0);
    }

    $('.contact_form_file').on('change', 'input[type="file"]', function() {
    	uploadFile($(this), this.files);
    });
    
});

/* Google map */
function initMap() {
    document.querySelectorAll('.location_content_map').forEach(function(item, i, arr) {
        var dataLat = parseFloat(item.getAttribute('data-lat')),
            dataLng = parseFloat(item.getAttribute('data-lng')),
            marker = item.getAttribute('data-marker');

        var map = new google.maps.Map(item, {
            scrollwheel: false,
            draggable: !("ontouchend" in document),
            zoomControlOptions: {
                position:google.maps.ControlPosition.TOP_RIGHT
            },
            disableDefaultUI: true,
            zoom: 10,
            center: {lat: dataLat, lng: dataLng}
        });

        var marker = new google.maps.Marker({
            map: map,
            icon: marker,
            place: {
                location: {lat: dataLat, lng: dataLng},
                query: 'Place'
            }
        });
    });
}
