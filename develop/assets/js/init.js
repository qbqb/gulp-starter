$(document).ready(function() {

    $('body').stickTheFooter();

    $('input, textarea').placeholder({
        color : '#8f8f8f'
    });

    $(".c-input-phone").inputmask({ mask: "+7[-999][-999999]",
        greedy: false,
        showMaskOnHover: false,
        'clearIncomplete': false,
        clearMaskOnLostFocus: false
    });

    window.dropdown = $('.dropdown-on').dropdown();
    //dropdown.refresh( '.dropdown' );

    $('.fancybox').fancybox();

    $('.fancybox-modal').fancybox({
        // modal:true,
        closeBtn:false
    });

    $('.c-slider-on').bxSlider();

    $('.c-slider-fade-on').bxSlider({
        mode:'fade'
    });

    $('.c-tabs-on').tabslet({
        animation: true
    });

    $('.toggle-box').toggleBox();

    $('.c-input').focus(function() {
        $(this).removeClass('c-input-error');
        $(this).closest('.c-input-outer').removeClass('c-input-error');
    });


    $('.datepicker').datetimepicker({
        lang:'ru',
        timepicker:false,
        format:'d.m.Y',
        dayOfWeekStart:1,
        closeOnDateSelect:true,
        scrollInput: false,
        scrollMonth: false,
        onChangeMonth: function(current_time, $input){
            $input.val( current_time.dateFormat('d.m.Y') );
        }
    });

    $(".c-range").ionRangeSlider();

    $('.c-range-double').ionRangeSlider({
        type:'double',
        min:1000,
        max:50000,
        from:10000,
        to:40000,
        step: 1000,
        prefix: "",
        prettify: true,
        onLoad:   function (obj) {
            helpers.plugins.rangeSlider.setVal(obj);
        },
        onChange: function (obj) {
            helpers.plugins.rangeSlider.setVal(obj);
        }
    });

    $('.active-toggle').click(function(){
        $(this).toggleClass('active');
    });

    //$('#myModal').modal();

    helpers.plugins.googleMaps.init.call(google.maps, {
        id:'map_canvas',
        centerY:59.9369183,
        centerX:30.3230151,
        zoom:16,
        markerImgUrl:'/assets/images/map-marker-sprite.png',
        markerWidth:27,
        markerHeight:40,
        markerOffsetX:14,
        markerOffsetY:40,
    });

    if( $('#map_canvas')[0] ) {
        google.maps.addMarkers( helpers.plugins.googleMaps.data.places1 );
    }

    helpers.plugins.googleMaps.actions();

    helpers.browser.ie();
    helpers.browser.mobile();
    helpers.forms.formControls();
    helpers.local.site();

});