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

    $('.dropdown-on').dropdown();

    $('.fancybox').fancybox();

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


    $('#map_canvas').createMap({
        centerY:59.937266,
        centerX:30.322400,
        zoom:17,

        places: [
            ['Our Office', 59.937266,30.322400]
        ],

        markerImgUrl:'/assets/images/map-marker.png',
        markerWidth:40,
        markerHeight:40,
        markerOffsetX:14,
        markerOffsetY:40,
        animation: google.maps.Animation.DROP,

        styles:[
            {
              "featureType": "water",
              "stylers": [
                { "visibility": "on" },
                { "saturation": 0 },
                { "lightness": -13 }
              ]
            }
        ],

        draggable: IS_MOBILE.any() ? false : true,

        actions: function(map, markers){

            var y = markers[0].getPosition().lat()
            var x = markers[0].getPosition().lng()

            $('.map-btn').click(function(event) {
                 map.panTo(new google.maps.LatLng(y,x));
                 map.setZoom(17);
                 return false;
            });

        }

    });

    console.log('5');



});