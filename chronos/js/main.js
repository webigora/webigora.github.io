$(document).ready(function() {

    /* Svg */
    svg4everybody();

    /* Toggle mobile navbar */
    $(document).on('click', '.header_toggle', function(event) {
        if ($(this).find('.header_toggle_button').hasClass('active')) {
            $(this).find('.header_toggle_button').removeClass('active');
            $('.navbar_mobile').slideUp();
        }
        else {
            $(this).find('.header_toggle_button').addClass('active');
            $('.navbar_mobile').slideDown();
        }    
    });

    $(window).resize(function(event) {
        if ($('.header_toggle').is(':hidden')) {
            $('.header_toggle_button').removeClass('active');
            $('.navbar_mobile').css('display', '');
        }
    });

    /* Sidebar nav */
    $(window).on('scroll', function(event) {
        if ($(window).scrollTop() < $('body').offset().top) {
            $('.sidebar_nav li').removeClass('active');
        }

        $('.section_content').each(function(i, el) {
            var headerHeight = $('.header').innerHeight(),
                top = $(el).offset().top,
                bottom = top + $(el).innerHeight(),
                scroll = $(window).scrollTop() + headerHeight,
                id = $(el).attr('id');

            if (scroll >= top && scroll < bottom && id) {
                $('.sidebar_nav li').removeClass('active');
                $('.sidebar_nav a[href="#'+id+'"]').parents('li').addClass('active');
            }
        })
    });

    $('.sidebar_nav').on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            headerHeight = $('.header').innerHeight(),
            top = $(id).offset().top;
        $('body, html').animate({scrollTop: top - headerHeight}, 500);
    });

    /* Load scroll */
    $(window).on('load', function(event) {
        if (window.location.hash) {
            var current = $(window.location.hash),
                top = current.offset().top;
                hHeader = $('.header').innerHeight();
            $('body, html').animate({scrollTop: top-hHeader}, 500);
        }
    });

    /* Profile photo */
    function uploadProfilePhoto() {
        var file = this.files[0],
            currentSrc = $('.sidebar_profile_photo').find('img').attr('src');

        function uploadCompletion() {
            $('.photo_change_text').show();
            $('.photo_change_download').hide();
            $('.sidebar_profile_photo').removeClass('active');
            $('.photo_change_progress').find('span').css('width', '0');
        }

        if (file.type.indexOf('image') != -1) {
            var reader = new FileReader();

            reader.onloadstart = function(e) {
                if (!$('.sidebar_profile_photo').hasClass('active')) {
                    $('.sidebar_profile_photo').addClass('active');
                    $('.photo_change_text').hide();
                    $('.photo_change_download').show();
                }
            };              

            reader.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percent = parseInt(((e.loaded / e.total) * 100), 10);
                    $('.photo_change_progress').find('span').css('width', percent+'%');
                }   
            };

            reader.onloadend = function(e) {
                if ($('.sidebar_profile_photo').find('img').attr('src')) {
                    $('.sidebar_profile_photo').find('img').attr('src', e.target.result);
                }
                else {
                   $('.sidebar_profile_photo').prepend('<img src="'+e.target.result+'" alt="">') 
                }
                
                uploadCompletion();
            };

            reader.readAsDataURL(file);

            $(this).val('');

            $('.profile_photo_upload').on('click', '.photo_change_remove', function(event) {
                event.preventDefault();
                reader.abort();
                $('.sidebar_profile_photo').find('img').attr('src', currentSrc);
                uploadCompletion();
            });
        }
        else {
            alert('Select an image');
        }
    }

    $('.profile_photo_upload').on('change', 'input', uploadProfilePhoto);

    /* Search */
    $('.header_search_form').on('focus', '.header_search_field', function(event) {
        $(this).parents('.header_search_form').addClass('active');
    });

    function closeSearch() {
        $('.header_search_form').removeClass('active');
        $('.header_search_field').val('');
    }

    $('.header_search_form').on('blur', '.header_search_field', function(event) {
        closeSearch();
    });

    $('.header_search_form').on('click', '.header_search_close', function(event) {
        closeSearch();
    });

    /* Search name */
    function searchInText(wrapSection, wantedText) {
        $('.header_search_form').on('input', 'input', function(event) {
            var that = $(this);

            $(wrapSection).find(wantedText).each(function(index, el) {
                if ($(this).text().toUpperCase().indexOf(that.val().toUpperCase()) === -1) {
                    $(el).closest('.search_item').hide();
                }
                else {
                    $(el).closest('.search_item').show();
                }
            });
        });
    }

    searchInText('.content_search', '.search_item_name');

    /* Popup gallery */
    $('.timeline_photo_item').on('click', function(event) {
        event.preventDefault();
        $('body').addClass('no_scroll');
        $('.popup_gallery').fadeIn();

        var galleryWrap = $('.'+$(this).attr('href')),
            controlsGallery = galleryWrap.find('.gallery_controlls a');

        galleryWrap.show();

        galleryWrap.find('.gallery_carousel').flexslider({
            animation: 'slide',
            controlNav: false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 60,
            itemMargin: 10,
            asNavFor: galleryWrap.find('.gallery_current')
        });

        galleryWrap.find('.gallery_current').flexslider({
            animation: 'fade',
            animationSpeed: 300,
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: galleryWrap.find('.gallery_carousel'),
            customDirectionNav: controlsGallery
        });
    });

    $('.popup_gallery_close').on('click', function(event) {
        event.preventDefault();
         $('body').removeClass('no_scroll');
        $('.gallery_section:visible').find('.gallery_current').removeData('flexslider');
        $('.gallery_section:visible').find('.gallery_carousel').removeData('flexslider');
        $('.gallery_section').hide();
        $('.popup_gallery').fadeOut();
    });

    /* Slider before-after */
    if ($('.slider_before_after').length) {
        $('.slider_before_after').flexslider({
            animation: 'slide',
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            customDirectionNav: '.photos_slider_controlls a',
            start: function(slider) {
                $('.photos_slider_counter').find('.photo_current').html(slider.currentSlide+1);
                $('.photos_slider_counter').find('.photos_total').html(slider.count);
            },
            after: function(slider) {
                $('.photos_slider_counter').find('.photo_current').html(slider.currentSlide+1);
                $('.photos_slider_counter').find('.photos_total').html(slider.count);
            }
        });
    }

    /* Scrollbar */
    $('.scroll_content').mCustomScrollbar();

    /* Switcher */
    $(document).on('change', '.profile_switch_checkbox', function(event) {
        var that = $(this);
        if (that.is(':checked')) {
            $('.profile_switch_checkbox').prop('checked', false);
            openConfirmPopup($('#confirm_public'));
            $('#confirm_public').on('click', '.popup_confirm_yes', function(event) {
                event.preventDefault();
                $('.profile_switch_checkbox').prop('checked', true);
                $('.profile_switcher_text').find('.variable_text').text('Private');
            });
        } 
        else {
            $('.profile_switch_checkbox').prop('checked', true);
            openConfirmPopup($('#confirm_private'));
            $('#confirm_private').on('click', '.popup_confirm_yes', function(event) {
                event.preventDefault();
                $('.profile_switch_checkbox').prop('checked', false);
                $('.profile_switcher_text').find('.variable_text').text('Public');
            });
        }
    });

    /* Comments */
    $(document).on('focus', '.comments_form_textarea', function(event) {
        $(this).closest('.comments_form').addClass('focus');
    });

    $(document).on('blur', '.comments_form_textarea', function(event) {
        $(this).closest('.comments_form').removeClass('focus');
    });

    $('.comment_box').on('click', '.comment_reply', function(event) {
        event.preventDefault();
        $(this).closest('.comment_wrap').find('.comments_form').siblings('.comment_inner').find('.comment_reply').show();
        $(this).closest('.comment_wrap').find('.comments_form').remove();
        $(this).hide();
        var cloneFormComments = $('.comments_form_reply').clone().html();
        $(this).closest('.comment_box').append(cloneFormComments);
    });

    function uploadFormPhoto() {
        var file,
            that = $(this),
            thisWrap = that.closest('.form_bottom');

        for (var i = 0; i < this.files.length; i++) {
            file = this.files[i]; 

            if (file.type.indexOf('image') != -1) {
                var reader = new FileReader();

                reader.onloadstart = function(e) {
                    thisWrap.find('.form_bottom_download').css('display', 'inline-block');
                };              

                reader.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percent = parseInt(((e.loaded / e.total) * 100), 10);
                        thisWrap.find('.form_bottom_progress').find('span').css('width', percent+'%');
                        thisWrap.find('.form_attach_photo').css('pointer-events', 'none');
                    }   
                };

                reader.onloadend = function(e) {
                    thisWrap.find('.form_bottom_download').hide();

                    if (e.target.result) {
                        thisWrap.find('.form_bottom_photos').css('display', 'inline-block').append('<div class="form_photo_item"><div class="form_photo_img"><img src="'+e.target.result+'" alt=""></div><a class="form_photo_remove" href="#"><svg class="svg_remove_photo"><use xlink:href="images/sprite/sprite.svg#remove_photo"></use></svg></a></div>');
                    }

                    thisWrap.find('.form_attach_photo').css('pointer-events', 'auto');
                    thisWrap.find('.form_bottom_progress').find('span').css('width', '0');
                };

                reader.readAsDataURL(file);             

                $('.form_bottom_download').on('click', '.form_bottom_remove', function(event) {
                    event.preventDefault();
                    reader.abort();
                });

                $(document).on('click', '.form_photo_remove', function(event) {
                    event.preventDefault();
                    $(this).closest('.form_photo_item').remove();

                    if (!thisWrap.find('.form_bottom_photos').find('.form_photo_item').length) {
                        thisWrap.find('.form_bottom_photos').hide();
                    }
                });
            }
            else {
                alert('Select an image');
            }
        }
    }

    $(document).on('change', '.form_attach_file', uploadFormPhoto);

    /* Notifactions */
    $('.header').on('click', '.header_messages', function(event) {
        $(this).addClass('active');
        $('.notifactions_side').fadeIn();
    });

    $('.notifactions_side').on('click', '.notifactions_close', function(event) {
        event.preventDefault();
        $('.header_messages').removeClass('active');
        $('.notifactions_side').fadeOut();
    });

    $('.notifactions_wrap').on('click', '.notifaction_box[href^="#"]', function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top,
            heightHeader = $('.header').innerHeight();
        $('body, html').animate({scrollTop: top - heightHeader}, 500);
    });

    /* Confirm popup */
    function openConfirmPopup(popup) {
        popup.fadeIn();
         $('body').addClass('no_scroll');
    }

    function closeConfirmPopup(popup) {
        popup.fadeOut();
        $('body').removeClass('no_scroll');
    }

    $(document).on('click', '.header_logout', function(event) {
        event.preventDefault();
        var idPopup = $(this).attr('href');
        openConfirmPopup($(idPopup));
    });

    $('.popup_confirmation').on('click', 'a', function(event) {
        event.preventDefault();
        var currentPopup = $(this).closest('.popup_confirm').prop('id');
        closeConfirmPopup($('#'+currentPopup));
    });

    $(document).on('click', '.delete_button', function(event) {
        event.preventDefault();
        var idPopup = $(this).attr('href');
        openConfirmPopup($(idPopup));

        var that = $(this);

        $('#confirm_delete').on('click', '.popup_confirm_yes', function(event) {
            event.preventDefault();
            that.closest('.comment_box').remove();
        });
    });

    $(document).on('click', '.is_private', function(event) {
        event.preventDefault();
        var idPopup = $(this).attr('href');
        openConfirmPopup($(idPopup));
    });

    $(document).on('click', '.popup_profile_close', function(event) {
        event.preventDefault();
        var currentPopup = $(this).closest('.popup_confirm').prop('id');
        closeConfirmPopup($('#'+currentPopup));
    });

    /* Popup */
    function popupSize(popup) {
        $('.popup_block').css({'height': ''});

        var hWindow = $(window).innerHeight(),
            hPopup = $(popup).innerHeight();

        if (hPopup > hWindow) {
            $(popup).innerHeight(hWindow);
        }
        else {
            $(popup).css('height', '');
        }

        var popMargTop = ($(popup).innerHeight()) / 2;     
        $(popup).css({'margin-top': -popMargTop});
    }

    $(document).on('click', 'a.poplight', function(event) {
        event.preventDefault();

        $('.popup_block').hide();
        $('#fade, a.popup_close').remove();

        var popID = $(this).attr('href');

        $(popID).fadeIn();

        popupSize(popID);

        $('body').append('<div id="fade"><a href="/" class="popup_logo"><img src="images/logo.png" alt=""></a><a href="#" class="popup_close"><svg class="svg_close_popup"><use xlink:href="images/sprite/sprite.svg#close_popup"></use></svg></a></div>');
        $('#fade').show();
    });

    $(document).on('click touchstart', 'a.popup_close, #fade', function(event) {
        event.preventDefault();

        $('#fade, .popup_block').fadeOut(function() {
            $('#fade').remove();
            $('.popup_block').css({'height': ''});
        });
    });

    $(window).resize(function(event) {
        if ($('.popup_block:visible').length) {
            popupSize('.popup_block:visible');
        }
    });

    /* Validate */
    if ($('.popup_form').length) {
        $('.popup_form').each(function(index, el) {
            $(this).validate({
                rules: {
                    login_name: {
                        required: true,
                        minlength: 2
                    },
                    login_password: {
                        required: true,
                        minlength: 6
                    },
                    forgot_email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    login_name: {
                        required: 'Please enter surname'
                    },
                    login_password: {
                        required: 'Please enter password'
                    },
                    forgot_email: {
                        required: 'Please enter email',
                        email: 'Wrong email address'
                    }
                }
            });
        });
    }

    /* Chart */
    if (document.querySelector('.dashboard_graphs')) {
        var hGraph = $('.graph_block').height() + 60;

        $(window).resize(function(event) {
            hGraph = $('.graph_block').height() + 60;
        });

        Chart.defaults.global.defaultFontColor = '#a4b0c1';
        Chart.defaults.global.defaultFontFamily = 'Roboto, Arial, sans-serif';
        Chart.defaults.global.defaultFontSize = 12;

        // Chart weight
        var dataWeightLabels = $('#graph_weight').attr('data-chart-labels').split(','),
            dataWeightValues = $('#graph_weight').attr('data-chart-value').split(','),
            dataWeightGoal = $('#graph_weight').attr('data-chart-goal');

        var chartWeight = document.getElementById('graph_weight').getContext('2d');

        var gradientChartWeight = chartWeight.createLinearGradient(0, 0, 0, hGraph);
            gradientChartWeight.addColorStop(0, 'rgba(59,153,240,0.3)');
            gradientChartWeight.addColorStop(0.3, 'rgba(59,153,240,0.2)');
            gradientChartWeight.addColorStop(0.6, 'rgba(59,153,240,0.1)');
            gradientChartWeight.addColorStop(1, 'rgba(59,153,240,0.01)');

        var chart = new Chart(chartWeight, {
            type: 'line',
            data: {
                labels: dataWeightLabels,
                datasets: [{
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointBackgroundColor: '#3b99f0',
                    backgroundColor: gradientChartWeight,
                    borderColor: '#7ebcf5',
                    data: dataWeightValues
                }]
            },
            plugins: [{
                afterUpdate: function(chart) {
                    var dataset = chart.config.data.datasets[0];
                    var offset = 1;
                
                    for (var i = 0; i < dataset._meta[0].data.length; i++) {
                        var model = dataset._meta[0].data[i]._model;
                        model.y += offset;
                        model.controlPointNextY += offset;
                        model.controlPointPreviousY += offset;
                    }
                }
            }],
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        }
                    }]
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + 'lbs';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: dataWeightGoal,
                        borderColor: '#72b6f4',
                        borderWidth: 1,
                        borderDash: [5, 2],
                        label: {
                            backgroundColor: 'transparent',
                            fontFamily: 'Roboto, Arial, sans-serif',
                            fontSize: 10,
                            fontColor: '#3b99f0',
                            xPadding: 0,
                            yPadding: 0,
                            position: 'left',
                            yAdjust: -7,
                            enabled: true,
                            content: 'Goal '+dataWeightGoal+'lbs'
                        }
                    }],
                    drawTime: 'afterDraw'
                }
            }
        });

        // Chart fat
        var dataFatLabels = $('#graph_fat').attr('data-chart-labels').split(','),
            dataFatValues = $('#graph_fat').attr('data-chart-value').split(','),
            dataFatGoal = $('#graph_fat').attr('data-chart-goal');

        var chartFat = document.getElementById('graph_fat').getContext('2d');
        
        var gradientChartFat = chartFat.createLinearGradient(0, 0, 0, hGraph);
            gradientChartFat.addColorStop(0, 'rgba(21,218,146,0.3)');
            gradientChartFat.addColorStop(0.3, 'rgba(21,218,146,0.2)');
            gradientChartFat.addColorStop(0.6, 'rgba(21,218,146,0.1)');
            gradientChartFat.addColorStop(1, 'rgba(21,218,146,0.01)');

        var chart = new Chart(chartFat, {
            type: 'line',
            data: {
                labels: dataFatLabels,
                datasets: [{
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointBackgroundColor: '#15da92',
                    backgroundColor: gradientChartFat,
                    borderColor: '#64e6b7',
                    data: dataFatValues
                }]
            },
            plugins: [{
                afterUpdate: function(chart) {
                    var dataset = chart.config.data.datasets[0];
                    var offset = 1;
                
                    for (var i = 0; i < dataset._meta[1].data.length; i++) {
                        var model = dataset._meta[1].data[i]._model;
                        model.y += offset;
                        model.controlPointNextY += offset;
                        model.controlPointPreviousY += offset;
                    }
                }
            }],
            options: {
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        },
                        ticks: {
                            min: 20,
                            stepSize: 10
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + '%';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: dataFatGoal,
                        borderColor: '#72b6f4',
                        borderWidth: 1,
                        borderDash: [5, 2],
                        label: {
                            backgroundColor: 'transparent',
                            fontFamily: 'Roboto, Arial, sans-serif',
                            fontSize: 10,
                            fontColor: '#40e1a6',
                            xPadding: 0,
                            yPadding: 0,
                            position: 'left',
                            yAdjust: -7,
                            enabled: true,
                            content: 'Goal '+dataFatGoal+'%'
                        }
                    }],
                    drawTime: 'afterDraw'
                }
            }
        });

        // Chart muscle
        var dataMuscleLabels = $('#graph_muscle').attr('data-chart-labels').split(','),
            dataMuscleValues = $('#graph_muscle').attr('data-chart-value').split(',');

        var chartMuscle = document.getElementById('graph_muscle').getContext('2d');
        
        var gradientChartMuscle = chartMuscle.createLinearGradient(0, 0, 0, hGraph);
            gradientChartMuscle.addColorStop(0, 'rgba(248,83,60,0.3)');
            gradientChartMuscle.addColorStop(0.3, 'rgba(248,83,60,0.2)');
            gradientChartMuscle.addColorStop(0.6, 'rgba(248,83,60,0.1)');
            gradientChartMuscle.addColorStop(1, 'rgba(248,83,60,0.01)');

        var chart = new Chart(chartMuscle, {
            type: 'line',
            data: {
                labels: dataMuscleLabels,
                datasets: [{
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointBackgroundColor: '#f8533c',
                    backgroundColor: gradientChartMuscle,
                    borderColor: '#fa8d7e',
                    data: dataMuscleValues
                }]
            },
            plugins: [{
                afterUpdate: function(chart) {
                    var dataset = chart.config.data.datasets[0];
                    var offset = 1;
                
                    for (var i = 0; i < dataset._meta[2].data.length; i++) {
                        var model = dataset._meta[2].data[i]._model;
                        model.y += offset;
                        model.controlPointNextY += offset;
                        model.controlPointPreviousY += offset;
                    }
                }
            }],
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        },
                        ticks: {
                            min: 20,
                            stepSize: 10
                        }
                    }]
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + '%';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                }
            }
        });

        // Chart waist
        var dataWaistLabels = $('#graph_waist').attr('data-chart-labels').split(','),
            dataWaistValues = $('#graph_waist').attr('data-chart-value').split(',');

        var chartWaist = document.getElementById('graph_waist').getContext('2d');
        
        var gradientChartWaist = chartWaist.createLinearGradient(0, 0, 0, chartWaist.canvas.height);
            gradientChartWaist.addColorStop(0, 'rgba(150,133,213,1)');
            gradientChartWaist.addColorStop(1, 'rgba(195,131,186,1)');

        var chart = new Chart(chartWaist, {
            type: 'bar',
            data: {
                labels: dataWaistLabels,
                datasets: [{
                    backgroundColor: gradientChartWaist,
                    hoverBackgroundColor: gradientChartWaist,
                    data: dataWaistValues
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        },
                        ticks: {
                            min: 20
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0
                        },
                        barPercentage: 0.2
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    yAlign: 'top',
                    xAlign: 'center',
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + '%';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                }
            }
        });

        // Chart hips
        var dataHipsLabels = $('#graph_hips').attr('data-chart-labels').split(','),
            dataHipsValues = $('#graph_hips').attr('data-chart-value').split(',');

        var chartHips = document.getElementById('graph_hips').getContext('2d');
        
        var gradientChartHips = chartHips.createLinearGradient(0, 0, 0, chartHips.canvas.height);
            gradientChartHips.addColorStop(0, 'rgba(150,133,213,1)');
            gradientChartHips.addColorStop(1, 'rgba(195,131,186,1)');

        var chart = new Chart(chartHips, {
            type: 'bar',
            data: {
                labels: dataHipsLabels,
                datasets: [{
                    backgroundColor: gradientChartHips,
                    hoverBackgroundColor: gradientChartHips,
                    data: dataHipsValues
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        },
                        ticks: {
                            min: 20
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0
                        },
                        barPercentage: 0.2
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    yAlign: 'top',
                    xAlign: 'center',
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + '%';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                }
            }
        });

        // Chart thighs
        var dataThighsLabels = $('#graph_thighs').attr('data-chart-labels').split(','),
            dataThighsValues = $('#graph_thighs').attr('data-chart-value').split(',');

        var chartThighs = document.getElementById('graph_thighs').getContext('2d');
        
        var gradientChartThighs = chartThighs.createLinearGradient(0, 0, 0, chartThighs.canvas.height);
            gradientChartThighs.addColorStop(0, 'rgba(150,133,213,1)');
            gradientChartThighs.addColorStop(1, 'rgba(195,131,186,1)');

        var chart = new Chart(chartThighs, {
            type: 'bar',
            data: {
                labels: dataThighsLabels,
                datasets: [{
                    backgroundColor: gradientChartThighs,
                    hoverBackgroundColor: gradientChartThighs,
                    radius: 20,
                    data: dataThighsValues
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: '#ecf1f4'
                        },
                        ticks: {
                            min: 20
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 0
                        },
                        barPercentage: 0.2
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 0,
                    titleFontColor: '#ffffff',
                    titleFontSize: 12,
                    titleFontFamily: 'Roboto, Arial, sans-serif',
                    titleFontStyle: 'normal',
                    cornerRadius: 5,
                    displayColors: false,
                    yAlign: 'top',
                    xAlign: 'center',
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return;
                        },
                        title: function(tooltipItems, data) {
                            return tooltipItems[0].yLabel + '%';
                        }
                    }
                },
                hover: {
                    onHover: function(e) {
                        var point = this.getElementAtEvent(e);
                        if (point.length) e.target.style.cursor = 'pointer';
                        else e.target.style.cursor = 'default';
                    }
                }
            }
        });

        //Rounded border
        Chart.elements.Rectangle.prototype.draw = function() {       
            var ctx = this._chart.ctx;
            var vm = this._view;
            var left, right, top, bottom, signX, signY, borderSkipped, radius;
            var borderWidth = vm.borderWidth;
            // Set Radius Here
            // If radius is large enough to cause drawing errors a max radius is imposed
            var cornerRadius = 20;

            if (!vm.horizontal) {
                // bar
                left = vm.x - vm.width / 2;
                right = vm.x + vm.width / 2;
                top = vm.y;
                bottom = vm.base;
                signX = 1;
                signY = bottom > top? 1: -1;
                borderSkipped = vm.borderSkipped || 'bottom';
            } else {
                // horizontal bar
                left = vm.base;
                right = vm.x;
                top = vm.y - vm.height / 2;
                bottom = vm.y + vm.height / 2;
                signX = right > left? 1: -1;
                signY = 1;
                borderSkipped = vm.borderSkipped || 'left';
            }

            // Canvas doesn't allow us to stroke inside the width so we can
            // adjust the sizes to fit if we're setting a stroke on the line
            if (borderWidth) {
                // borderWidth shold be less than bar width and bar height.
                var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
                borderWidth = borderWidth > barSize? barSize: borderWidth;
                var halfStroke = borderWidth / 2;
                // Adjust borderWidth when bar top position is near vm.base(zero).
                var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
                var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
                var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
                var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
                // not become a vertical line?
                if (borderLeft !== borderRight) {
                    top = borderTop;
                    bottom = borderBottom;
                }
                // not become a horizontal line?
                if (borderTop !== borderBottom) {
                    left = borderLeft;
                    right = borderRight;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = vm.backgroundColor;
            ctx.strokeStyle = vm.borderColor;
            ctx.lineWidth = borderWidth;

            // Corner points, from bottom-left to bottom-right clockwise
            // | 1 2 |
            // | 0 3 |
            var corners = [
                [left, bottom],
                [left, top],
                [right, top],
                [right, bottom]
            ];

            // Find first (starting) corner with fallback to 'bottom'
            var borders = ['bottom', 'left', 'top', 'right'];
            var startCorner = borders.indexOf(borderSkipped, 0);
            if (startCorner === -1) {
                startCorner = 0;
            }

            function cornerAt(index) {
                return corners[(startCorner + index) % 4];
            }

            // Draw rectangle from 'startCorner'
            var corner = cornerAt(0);
            ctx.moveTo(corner[0], corner[1]);

            for (var i = 1; i < 4; i++) {
                corner = cornerAt(i);
                nextCornerId = i+1;
                if(nextCornerId == 4){
                    nextCornerId = 0
                }

                nextCorner = cornerAt(nextCornerId);

                width = corners[2][0] - corners[1][0];
                height = corners[0][1] - corners[1][1];
                x = corners[1][0];
                y = corners[1][1];
                
                var radius = cornerRadius;
                
                // Fix radius being too large
                if(radius > height/2){
                    radius = height/2;
                }if(radius > width/2){
                    radius = width/2;
                }

                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);

            }

            ctx.fill();
            if (borderWidth) {
                ctx.stroke();
            }
        }; 
    }

    /* Staff login */
    $('.popup_staff_toggle').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.staff_login').addClass('staff_popup_hidden');
        $($(this).attr('href')).removeClass('staff_popup_hidden');
    });

    /* Find an existing client */
    if ($('.find_client_field').length) {
        $('.find_client_field').easyAutocomplete({
            url: 'json/find_clients.json',
            getValue: 'name',
            cssClasses: 'find_client',
            template: {
                type: 'iconLeft',
                fields: {
                    iconSrc: 'icon'
                }
            },
            list: {
                match: {
                  enabled: true
                }
            }
        });
    }

    /* Datepick */
    if ($('.datepick_input').length) {
        $('.datepick_input').datepick({
            dateFormat: 'dd/mm/yyyy',
            showAnim: 'fadeIn',
            minDate: 'T',
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            onSelect: function(dates) {
                $(this).focus();
            }
        });
    }

    /* Focus creating form */
    $('.creating_form_item').on('focus', 'input', function(event) {
        $(this).siblings('.creating_form_placeholder').addClass('focus');
        $(this).closest('.creating_form_item').addClass('focus');
    });

    $('.creating_form_item').on('blur', 'input', function(event) {
        if ($(this).val() == '') {
            $(this).siblings('.creating_form_placeholder').removeClass('focus');
        }
        $(this).closest('.creating_form_item').removeClass('focus');
    });

    /* Clear creating form */
    $('.creating_form_clear').on('click', function(event) {
        event.preventDefault();
        $(this).closest('form').trigger('reset');
        $(this).closest('form').find('input').trigger('blur');
        $('.form_photo_item').remove();
        $('.form_bottom_photos').hide();
    });

});	