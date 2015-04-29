$(document).ready(function() {


  /******************************************************************/
  /********************** Global Initialization *********************/
  /******************************************************************/


  //................Bowser
  /*
    chrome[webkit]
    firefox[gecko]
    msie
    Android native browser as android[webkit]
    iOS native browser as ios[webkit]
    opera[webkit if >12]
    phantomjs[webkit]
    safari[webkit]
    seamonkey[gecko]
    BlackBerry native browser as blackberry[webkit]
    WebOS native browser as webos[webkit]
    Amazon Kindle browser as silk[webkit]
    Bada browser as bada[webkit]
    Tizen browser as tizen[webkit]
    Sailfish browser as sailfish[gecko]
    android
    Windows Phone as windowsphone
    ios (iphone/ipad/ipod)
    blackberry
    firefoxos
    webos (touchpad)
    bada
    tizen
    sailfish
  */
  (function(){
    if ( bowser.mobile || bowser.tablet || bowser.touchpad ) {
      $('body').addClass('mobile');
    }
  })();



  //................Sticky footer
  (function(){
    var $w = $(window),
        $h = $('#SiteHeader'),
        $c = $('#SiteContent'),
        $f = $('#SiteFooter'),
        hh = $h.outerHeight(),
        fh = $f.outerHeight(),
        wh;
    resizer();
    if (window.addEventListener) {
      window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', resizer);
    }
    function resizer(){
      wh = $w.outerHeight();
      $c.css('minHeight', wh - hh - fh);
    }
  })();




  //................Placeholder
  $('input, textarea').placeholder({
      color : '#8f8f8f'
  });



  //................Inputmask
  $(".input-phone").inputmask({
      mask: "+7[-999][-999999]",
      //mask: "+7 (999) 999-99-99",
      greedy: false,
      showMaskOnHover: false,
      'clearIncomplete': false,
      clearMaskOnLostFocus: false
  });



  //................Slider
  /*

    {
      mode:'fade',
      speed:800,
      easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      pager:false,

      auto:true,
      pause:2000,
      autoHover:true,

      slideWidth: 1000,
      minSlides: 4,
      maxSlides: 4,
      slideMargin: 10,
      moveSlides: 1,

      infiniteLoop:false,

      onSliderLoad:function(currentIndex){},
      onSlideBefore:function($slideElement, oldIndex, newIndex){},
      onSlideAfter:function($slideElement, oldIndex, newIndex){}
    }

    slider.goToPrevSlide();
    slider.goToNextSlide();
    slider.destroySlider();
    slider.goToSlide(i);

  */
  $('.slider-on').bxSlider();




  //................Fancybox
  (function(){

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
  })();



  //................Tabs
  $('.tabs-on').tabslet({
      animation: true
  });


  //................Dropdown
  $('.dropdown-on').dropdown();



  //................Toggle
  $('.toggle-box').toggleBox();



  //................Forms
  (function(){

    $('.filebox').filebox();

    $('.input-control,textarea').focus(function() {
        $(this).parent().removeClass('error');
    });

    $('.input-phone').keydown(function(e) {
      if ( $(this).val() ){
        $(this).addClass('hasVal');
      } else {
        $(this).removeClass('hasVal');
      }
    });

  })();


  //................Validation
  // (function(){

  //   $('.g-form').submit(function(e){
  //     e.preventDefault();

  //     var $form = $(this),
  //         $inputs = $form.find('.input-control, textarea'),
  //         $inputMail = $form.find('.input-mail:eq(0)'),
  //         hasError = false, val;

  //     $inputs.each(function(){
  //       val = $(this).val();
  //       if ( isBlank(val) ){
  //         $(this).parent().addClass('error');
  //         hasError = true;
  //         return;
  //       }
  //     });

  //     if( !isMail( $inputMail.val() ) ) {
  //       $inputMail.parent().addClass('error');
  //       hasError = true;
  //     }

  //     if (!hasError) {
  //       return true;
  //     } else {
  //       return false;
  //     }

  //     // for (var i = 0; i <= 1; i++) {
  //     //   $('.g-form')[i].reset();
  //     // };

  //   });

  //   function isBlank(str) {return (!str || /^\s*$/.test(str)); }
  //   function isMail(str) {return /^\w+@\w+\.\w{2,4}$/i.test(str); }

  // })();



  //................Google Map
  // $('#map1').googleMap().init();





  //................Datepicker
  // $('.datepicker').datetimepicker({
  //     lang:'ru',
  //     timepicker:false,
  //     format:'d.m.Y',
  //     dayOfWeekStart:1,
  //     closeOnDateSelect:true,
  //     scrollInput: false,
  //     scrollMonth: false,
  //     onChangeMonth: function(current_time, $input){
  //         $input.val( current_time.dateFormat('d.m.Y') );
  //     }
  // });




  //................Dot Dot Dot
  // (function(){
  //   var t,d;
  //   $(window).resize( (function(){
  //     var fn = function(){
  //       t == undefined ? d = 0 : d = 50;
  //       clearTimeout(t);
  //       t = setTimeout(function(){
  //         $('.text-overflow').dotdotdot({
  //           ellipsis  : '... '
  //         });
  //       },d);
  //     };
  //     fn();
  //     return fn;
  //   })() );
  // })();


  //................Sticky
  //$('#sticky').sticky({topSpacing:0});




  //................Appear
  // $(function(){
  //   $('.waiting').appear().trigger('scroll');
  //   $('.waiting').on('appear', function(event, $all_appeared_elements) {
  //     var currentId = $all_appeared_elements.eq(0).closest('.section').get(0).id;
  //     $(this).closest('.section')
  //       .addClass('appeared')
  //       .nextAll().removeClass('appeared');
  //     $(this).closest('.section').prevAll().addClass('appeared');
  //     $('.menu .active').removeClass('active');
  //     $(".menu [href='#"+currentId+"']").parent().addClass('active');
  //   });
  // });



  /******************************************************************/
  /********************** Local Initialization *********************/
  /******************************************************************/














});



