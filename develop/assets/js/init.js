$(document).ready(function() {

    /********************** Global *********************/

    $('input, textarea').placeholder({
        color : '#8f8f8f'
    });

    $(".input-phone").inputmask({
        mask: "+7[-999][-999999]",
        //mask: "+7 (999) 999-99-99",
        greedy: false,
        showMaskOnHover: false,
        'clearIncomplete': false,
        clearMaskOnLostFocus: false
    });

    $('.fancybox').fancybox();

    $('.fancybox-modal').fancybox({
        // modal:true,
        closeBtn:false
    });

/*
    $(".fancybox-thumb").fancybox({
      prevEffect  : 'none',
      nextEffect  : 'none',
      autoSize:false,
      maxHeight:500,
      minHeight:100,
      helpers : {
        title : {
          type: 'outside'
        },
        thumbs  : {
          width : 66,
          height  : 90,
          paddingBottom: 20
        }
      }
    });
*/


    $('.slider-on').bxSlider({

      // mode:'fade',
      // speed:800,
      // easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      // pager:true,

      // auto:true,
      // pause:2000,
      // autoHover:true,

      // slideWidth: 1000,
      // minSlides: 4,
      // maxSlides: 4,
      // slideMargin: 10,
      // moveSlides: 1

      // onSliderLoad:function(currentIndex){},
      // onSlideBefore:function($slideElement, oldIndex, newIndex){},
      // onSlideAfter:function($slideElement, oldIndex, newIndex){}

    });


    $('.tabs-on').tabslet({
        animation: true
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

    (function(){

      $('.c-range-double').ionRangeSlider({
          type:'double',
          min:1000,
          max:50000,
          from:10000,
          to:40000,
          step: 1000,
          prefix: "",
          prettify: true,
          onLoad:   function (obj) {callRange(obj);},
          onChange: function (obj) {callRange(obj);}
        });

      function callRange(obj){
        var $outer = obj.input.closest('.c-range-outer-simple'),
            $outputMin = $outer.find('.c-range-output-min'),
            $outputMax = $outer.find('.c-range-output-max');
        $outputMin.val(obj.fromNumber);
        $outputMax.val(obj.toNumber);
      }

    })();

    //$('#myModal').modal();






    /********************** Actions *********************/

    // chrome [ bowser.webkit ]
    // firefox [ bowser.gecko ]
    // ie [ bowser.msie ]
    // opera [ bowser.webkit && bowser.version > 12 ]
    // old opera [ !!window.opera ]

    // [ bowser.mobile ]
    // [ bowser.tablet ]
    // [ bowser.touchpad ]
    // [ bowser.android ]
    // [ bowser.windowsphone ]
    // [ bowser.ios ] [ bowser.iphone ] [ bowser.ipad ] [ bowser.ipod ]

    if ( bowser.mobile ) {
      $('body:eq(0)').addClass('mobile');
    }

    if ( bowser.msie && bowser.version == 8 ){
      $('body:eq(0)').addClass('ie8');
    }

    if ( bowser.msie && bowser.version == 7 ){
      $('body:eq(0)').addClass('ie7');
    }

    $('body').stickTheFooter();

    var dropdown = window.dropdown = $('.dropdown-on').dropdown();
    //dropdown.refresh( '.dropdown' );

    $('.toggle-box').toggleBox();

    $('.filebox').filebox();

    $('.js-toggle').click(function(){
        $(this).toggleClass('active');
    });

    $('.js-toggle-hover').hover(function(){
      $(this).addClass('hover');
    }, function(){
      $(this).removeClass('hover');
    });

    $('.input-control').focus(function() {
        $(this).parent().removeClass('error');
    });

    $('#map1').googleMap({
      mapOptions:{
        scrollwheel: false,
        draggable:true
      }
    }).init();




});