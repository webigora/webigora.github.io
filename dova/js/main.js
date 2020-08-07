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

    /* Sticky header */
    $(window).on('scroll', function(event) {
        if ($(window).scrollTop() > 0) {
            if ($('.intro_section').length) {
                $('.header').removeClass('header_white');
            }
            
            $('.header').addClass('header_sticky');
        }
        else {
            if ($('.intro_section').length) {
                $('.header').addClass('header_white');
            }

            $('.header').removeClass('header_sticky');
        }
    });

    /* Slider */
    if ($('.intro_slider').length) {        
        $('.intro_slider').slick({
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 1,
            arrows: false,
            fade: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000
        });
    }

    if ($('.latest_photo_slider').length) {        
        $('.latest_photo_slider').slick({
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 3,
            arrows: true,
            dots: false,
            centerMode: true,
            centerPadding: '15%',
            prevArrow: '<div class="arrow_slider arrow_prev"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M6.5 0L2.665 4.025 6.485 8h-2.17L.5 4.029 4.339 0H6.5z"/></svg></div>',
            nextArrow: '<div class="arrow_slider arrow_next"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M.5 0l3.835 4.025L.515 8h2.17L6.5 4.029 2.661 0H.5z"/></svg></div>',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        centerPadding: '10%'
                    }
                }
            ]
        });
    }

    if ($('.slider_images').length) {        
        $('.slider_images').slick({
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 1,
            arrows: true,
            dots: false,
            centerMode: true,
            centerPadding: '22%',
            prevArrow: '<div class="arrow_slider arrow_prev"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M6.5 0L2.665 4.025 6.485 8h-2.17L.5 4.029 4.339 0H6.5z"/></svg></div>',
            nextArrow: '<div class="arrow_slider arrow_next"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M.5 0l3.835 4.025L.515 8h2.17L6.5 4.029 2.661 0H.5z"/></svg></div>',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        centerPadding: '10%'
                    }
                }
            ]
        });
    }

    if ($('.gallery_slider').length) {     
        $('.gallery_slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			var i = (currentSlide ? currentSlide : 0) + 1;
			$('.gallery_slider_index').text(i);
			$('.gallery_slider_length').text(slick.slideCount);
        });

        $('.gallery_slider').slick({
            slidesToScroll: 1,
            infinite: true,
            slidesToShow: 1,
            arrows: true,
            dots: false,
            centerMode: true,
            centerPadding: '10%',
            prevArrow: '<div class="arrow_slider arrow_prev"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M6.5 0L2.665 4.025 6.485 8h-2.17L.5 4.029 4.339 0H6.5z"/></svg></div>',
            nextArrow: '<div class="arrow_slider arrow_next"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M.5 0l3.835 4.025L.515 8h2.17L6.5 4.029 2.661 0H.5z"/></svg></div>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        centerPadding: '15%'
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                        centerPadding: '10%'
                    }
                }
            ]
        });
    }

    /* Gallery */
    if ($('.imagas_gallery').length) {
        var magnificPopup = $.magnificPopup.instance;
        
        $('.imagas_gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1],
                arrowMarkup: '<div title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></div>',
                tCounter: ''
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            },
            callbacks: {
                open: function() {
                    this.container.swipe({
                        swipeLeft:function(event, direction, distance, duration, fingerCount) {
                            magnificPopup.next();
                        },
                        swipeRight:function(event, direction, distance, duration, fingerCount) {
                            magnificPopup.prev();
                        },
                    });
                }
            }
        });
    }

    /* Animation */
    if ($('.wow').length) {
        new WOW().init();
    }

    /* Scroll anchor */
    $('.scroll_link').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href'),
            top = $(href).offset().top;
        $('body, html').animate({scrollTop: top}, 300);
    });

    /* Styler form */
    if ($('.select_style').length) {
        $('.select_style').styler({
            selectSmartPositioning: false
        });
    }

    if ($('.form_number').length) {
        $('.form_number').styler();
    }

    /* Datapicker */
    if ($('.contact_date').length) {
        $('.contact_date').datepicker({
            language: 'en',
            offset: -1,
            showOtherMonths: false,
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            prevHtml: '<div class="datepicker_nav_prev"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M6.5 0L2.665 4.025 6.485 8h-2.17L.5 4.029 4.339 0H6.5z"/></svg></div>',
            nextHtml: '<div class="datepicker_nav_next"><svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8"><path d="M.5 0l3.835 4.025L.515 8h2.17L6.5 4.029 2.661 0H.5z"/></svg></div>',
            onSelect(formattedDate, date, inst) {
                $(inst.el).closest('.contact_form_field').addClass('active');
            }
        });
    }

    /* Focus contact form */
    $('.contact_form_field').on('focus', 'input, textarea', function(event) {
        $(this).closest('.contact_form_field').find('.contact_form_placeholder').addClass('focus');
        $(this).closest('.contact_form_field').addClass('focus');
    });

    $('.contact_form_field').on('blur', 'input, textarea', function(event) {
        if ($(this).val() == '') {
            $(this).siblings('.contact_form_placeholder').removeClass('focus');
        }
        $(this).closest('.contact_form_field').removeClass('focus');
    });

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
        } 
    });

    $('body').on('click', '.popup_close', function(event) {
        event.preventDefault();
        $(this).closest('.popup_fade').fadeOut();
        $.scrollLock(false);
    });

    /* Shop filter */
    const shopFilters = document.querySelectorAll('.shop_filter_list li');
    Array.from(shopFilters).forEach((node) =>
        node.addEventListener('click', function() {
            shopFilters.forEach((filter) => filter.classList.remove('current'));
            node.classList.add('current');
        })
    );
    
    if ($('.shop_container').length) {
        $('.shop_container').filterizr({
            gutterPixels: 8,
            layout: 'packed'
        });
    }

    /* Tabs */
    $('.tabs').on('click', 'li', function() {
        if (!$(this).hasClass('current')) {
            $(this).addClass('current').siblings().removeClass('current');
            $(this).closest('.tabs_section').find('.tab_box').removeClass('visible').eq($(this).index()).addClass('visible');
        }
    });

    /* Accordion */
    if ($('.accordion').length) {
        $('.accordion').on('click', '.accordion_trigger', function(event) {
            if (!$(this).hasClass('active')) {
                $(this).parents('.accordion').find('.toggle_container').slideUp('slow').siblings('.accordion_trigger').removeClass('active');
                $(this).addClass('active').next().slideDown('slow');
            }
            else {
                $(this).removeClass('active').next().slideUp('slow');
            }
        });
    }

    /* Change price */
    $('.card_product_counter').on('change', 'input', function(event) {
        changePrice();
    });

    function changePrice() {
        let currentPrice = $('.card_price_current').find('span').text();
        let count = $('.card_product_counter').find('input').val();
        let costPrice = currentPrice * count;

        $('.card_product_cost').text(costPrice);
    }

});

/* Mapbox */
if ($('.contact_map').length) {
    var dataLat = parseFloat(document.querySelector('.contact_map').getAttribute('data-lat')),
        dataLng = parseFloat(document.querySelector('.contact_map').getAttribute('data-lng')),
        srcMarker = document.querySelector('.contact_map').getAttribute('data-marker');

    mapboxgl.accessToken = 'pk.eyJ1Ijoid2ViaWdvcmEiLCJhIjoiY2s1aDE4YmI4MGI0azNtb2JweGt4NGMwdyJ9.NClH0fA6Z0E6Tnw_PD7KNg';

    var map = new mapboxgl.Map({
        container: 'contact_map',
        style: 'mapbox://styles/webigora/ck9ii66ax07uh1io6i3015kmb',
        center: [dataLat, dataLng],
        zoom: 13
    });

    var marker = document.createElement('div');
    marker.className = 'map_marker';
    marker.style.backgroundImage = 'url('+srcMarker+')';

    new mapboxgl.Marker(marker, {offset: [0, -95/2]})
        .setLngLat([dataLat, dataLng])
        .addTo(map);

    map.on('load', function () {
        map.resize();
    });
}
