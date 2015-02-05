;(function( $, window, undefined ) {


    jQuery.fn.stickTheFooter = function ( options ) {
        var o = $.extend({
            header   :  $('#header'),
            content  :  $('#content'),
            footer   :  $('#footer'),
            offset   :  0
        }, options);
        return this.each(function(event){
            var headerHeight   =  o.header.eq(0).outerHeight(),
                footerHeight   =  o.footer.eq(0).outerHeight();
            function init(){
               o.content.css('minHeight', $(window).outerHeight() - footerHeight - headerHeight + o.offset);
            }
            init();
            $(window).resize(init);
        });
    }



    jQuery.fn.dropdown = function ( options ) {

        var defaults = {
            button: '.dropdown-button',
            menu: '.dropdown-menu',
            buttonTitle: '.dropdown-button-title',
            item: '.dropdown-menu-item',
            itemTitle: '.dropdown-menu-title',
            inputHidden: '.dropdown-hidden',
            active:'active',
            dataAttr:'value',
        }

        var o = $.extend(defaults, options);

        var $el = $(this);



        $(document.body).on('click', $el.selector+" "+o.button, function(e){

            var $dropdown = $(this).closest($el.selector);
            var $menu  = $dropdown.find(o.menu);

            if ( !$dropdown.hasClass(o.active) ) {

                $($el.selector).removeClass(o.active);
                $($el.selector).find(o.menu).hide();
                $dropdown.addClass(o.active);
                $menu.show();
                $(window).on('click', hideDropdown);

            } else {

                $dropdown.removeClass(o.active);
                $menu.hide();
                $(window).off('click', hideDropdown);

            }

            e.preventDefault();

        });



        $(document.body).on('click', $el.selector+" "+o.item, function(e){
            var $dropdown = $(this).closest($el.selector);
            var $menu  = $dropdown.find(o.menu);
            var $buttonTitle = $dropdown.find(o.buttonTitle);
            var $inputHidden = $dropdown.find(o.inputHidden);
            var $checkbox;
            var level;
            var i = 0;

            if( $dropdown.hasClass('dropdown-multi') ) {

                if ( $inputHidden.val() == "" ){
                    var hiddenArr = [];
                } else {
                    var hiddenArr = $inputHidden.val().split(',');
                }

                $(o.menu).hide();
                $menu.show();
                $dropdown.addClass('dropdown-changed');

                $checkbox = $(this).find("input[type='checkbox']");
                $checkbox.prop("checked") == false ? $checkbox.prop("checked", true) : $checkbox.prop("checked", false);


                //Если выбрали главный элемент уровня
                if( $(this).hasClass('dropdown-menu-item-higher') ) {
                    level = $(this).data('level');
                    if( $checkbox.prop("checked") == false ){
                        setSubLevel(level,false);
                    } else {
                        setSubLevel(level,true);
                    }
                }

                function setSubLevel(level, boo){
                    $menu
                        .find('.dropdown-menu-item-sub')
                        .filter("[data-level = "+level+"]")
                        .each(function(){
                            $(this).find("input[type='checkbox']").prop("checked", boo);
                        });
                }


                //Если выбрали подуровень
                if( $(this).hasClass('dropdown-menu-item-sub') ) {
                    level = $(this).data('level');
                    var arr = [];

                    $menu
                        .find('.dropdown-menu-item-sub')
                        .filter("[data-level = "+level+"]")
                        .each(function(){
                            if( $(this).find("input[type='checkbox']").prop("checked") == false ) {
                                arr.push(0);
                            } else {
                                arr.push(1);
                            }
                        });

                        if (arr.indexOf( 0 ) < 0 ) {
                            setHigherLevel(level, true);
                        } else if ( arr.indexOf( 0 ) >= 0  ) {
                            setHigherLevel(level, false);
                        }

                }

                function setHigherLevel(level, boo){
                    $menu
                        .find('.dropdown-menu-item-higher')
                        .filter("[data-level = "+level+"]").eq(0)
                        .find("input[type='checkbox']").prop("checked", boo);
                }



                //Обновить значения
                $inputHidden.val(''); hiddenArr = [];
                $menu.find(o.item).each(function(){
                    if ( $(this).find("input[type='checkbox']").prop("checked") == true ) {
                        hiddenArr.push( $(this).data('value') );
                    }
                });
                $inputHidden.val( hiddenArr );


                //Обновили счетчик
                $menu.find(o.item).each(function(){
                    if( $(this).find("input[type='checkbox']").prop("checked") == true ){
                        i++;
                    }
                });

                if ( i > 0) {
                    $buttonTitle
                        .find('.dropdown-button-count')
                        .html(" ("+i+")")
                } else {
                    $buttonTitle
                        .find('.dropdown-button-count')
                        .html("");

                    $dropdown.removeClass('dropdown-changed');
                }


                e.preventDefault();



            } else if ( $dropdown.hasClass('dropdown-lang') ) {
                $menu.hide();
                $dropdown.removeClass(o.active);
                $dropdown.addClass('dropdown-changed');
            } else {
                $menu.hide();
                $buttonTitle.html( $(this).find(o.itemTitle).html() );
                $inputHidden.val( $(this).data(o.dataAttr)).change();
                $dropdown.removeClass(o.active);
                $dropdown.addClass('dropdown-changed');
                e.preventDefault();
            }
        });

        function hideDropdown(e){
            if( $(e.target).is( $el.selector ) || $(e.target).is($el.selector + ' *')) return;
            $(o.menu).hide();
            $(window).off('click', hideDropdown);
            $( $el.selector ).removeClass(o.active);
        }




        this.refresh = function(el){

            var $el = $(el);

            $el.each(function(){

                var $thisEl = $(this),
                    $thisMenu = $thisEl.find('.dropdown-menu'),
                    $thisInputHidden = $thisEl.find('.dropdown-hidden'),
                    $thisInputHiddenArr = [],
                    $thisItem = $thisEl.find('.dropdown-menu-item'),
                    $thisButtonTitle = $thisEl.find('.dropdown-button-title'),
                    $thisItemHtml;

                if ( hasValue( $thisEl ) ) {
                    if ( $thisEl.hasClass('dropdown-multi') ) {
                        $thisInputHiddenArr = $thisInputHidden.val().split(',');
                        $thisInputHidden.val('');
                        for (var i = 0; i < $thisInputHiddenArr.length; i++) {
                            $thisItem.each(function(){
                                if( $(this).data('value') == $thisInputHiddenArr[i] ){
                                    $(this).trigger('click');
                                    $thisMenu.hide();
                                }
                            });
                        }
                    } else {
                        $thisItem.each(function(){
                            if( $(this).data('value') == $thisInputHidden.val() )
                               $thisEl.addClass('dropdown-changed');
                        });
                        $thisItemHtml = $thisItem.filter(" [ data-value = " + $thisInputHidden.val() + " ] ").eq(0).html();
                        $thisButtonTitle.html( $thisItemHtml );
                    }
                }

            });

            function hasValue(el){
                var val = el.find('.dropdown-hidden').val();
                return !val || /^\s*$/.test(val) ? false : true;
            }

        };

        this.refresh('.dropdown');



        return this.each(function(){
            var $el = $(this);
            $(this).data("dropdownOptions", o);
            $(this).data("dropdownButtonTitle", $(this).find(o.buttonTitle).html() );
        });


    }





    $.fn.fancyConfirm = function ( options ) {

        var defaults = {
            msg:"Are you sure?",
            content: "<div class='dialog-confirm'> <div class='dialog-confirm-mes'> {msg} </div> <div class='dialog-confirm-sub'> <input id='fancyconfirm_cancel' type='button' class='custom-button custom-button-gray' value='Отмена'> <input id='fancyConfirm_ok' type='button' class='custom-button' value='Удалить'> </div> </div>",
            success:function(){},
            cancel:function(){},
            beforeSuccess:function(){ return true; },
            beforeCancel:function(){},
            beforeShow:function(){},
            afterShow:function(){},
            afterClose:function(){}
        }

        var o = $.extend(defaults, options);

        $(document.body).on('click', $(this).selector, function(e){

            var $el = $(this);

            $.fancybox({
                'modal' : true,
                'content': o.content.replace("{msg}",o.msg),
                afterShow: function(){
                    o.afterShow($el);
                },
                beforeShow: function(){
                    o.beforeShow($el);
                    $("#fancyConfirm_ok").click(function() {
                        if( o.beforeSuccess($el) ) {
                            o.success($el);
                            $.fancybox.close();
                        }
                    });
                    $("#fancyconfirm_cancel").click(function() {
                        o.beforeCancel($el);
                        $.fancybox.close($el);
                        o.cancel($el);
                    });
                },
                afterClose:function(){
                    o.afterClose($el);
                }
            });
            e.preventDefault();
            e.stopPropagation();
        });

        return this;

    }



    $.fn.toggleBox = function( options ){

        var defaults = {
           buttonOpen:'.toggle-button-open',
           buttonClose:'.toggle-button-close',
           buttonToggle:'.toggle-button',
           buttonTitle:'.toggle-button-title',
           toggleContent:'.toggle-content',
           speed : 400,
           ease  : 'easeInOutQuad',
           beforeOpen:function(){},
           afterOpen: function(){},
           afterClose:function(){}
        }

        var o = $.extend(defaults, options);

        o.el = $(this).selector;

        function open(el, content){
            o.beforeOpen(el);
            el.addClass('active');
            content.stop(true,true).slideDown(o.speed, o.ease, function(){
                o.afterOpen(el);
            });

        }

        function close(el, content){
            el.removeClass('active');
            content.stop(true,true).slideUp(o.speed, o.ease, function(){
                o.afterClose(el);
            });
        }


        $(document.body).on('click', o.el+" "+o.buttonOpen, function(e){
            $box = $(this).closest(o.el),
            $content = $box.find(o.toggleContent);

            if( !$box.hasClass('active') ) {
                open($box, $content);
            }
            e.preventDefault();
        });

        $(document.body).on('click', o.el+" "+o.buttonClose, function(e){
            $box = $(this).closest(o.el),
            $content = $box.find(o.toggleContent);
            if( $box.hasClass('active') ) {
                close($box, $content);
            }
            e.preventDefault();
        });

        $(document.body).on('click', o.el+" "+o.buttonToggle, function(e){

            var $box = $(this).closest(o.el);
            var $content = $box.find(o.toggleContent);

            if( $box.hasClass('active') ){
                close($box, $content);

            } else {
                open($box, $content);

            }

            if( $(this).data('toggle-title-open') != '' &&  $(this).data('toggle-title-close') != '') {
                if( $box.hasClass('active') ){
                    $(this).html( $(this).data('toggle-title-close') );
                } else {
                    $(this).html( $(this).data('toggle-title-open') );
                }
            }
            e.preventDefault();


        });

        return this;

    }


    $.fn.googleMap = function (options) {

        var _this = this;

        var settings = $.extend({}, {
            zoom: 5,
            centerLat: 0,
            centerLon: 0
        }, options);

        this.initialize = function () {
            var mapOptions = {
                zoom: settings.zoom
            };

            var map = new google.maps.Map(_this.get(0), mapOptions);
            // do anything with your map object here,
            // eg: centering map, adding markers

            /********************************************
             * This is the trick!
             * set map object to element's data attribute
             ********************************************/
            _this.data('map', map);

            return _this;
        };
        // ... more methods

        return this;
    };


/*



After you define a map element, eg:

var mapCanvas = $('#map-canvas');
var map = mapCanvas.googleMap({
    zoom: 5,
    centerLat: 0,
    centerLong: 0
});
// ... add some pre-load initiation here, eg: add some markers
// then initialize map
map.initialize();
you can then get the map object later on by using element's ID, eg:

var mapCanvas = $('#map-canvas');
$('.location').on('click', function () {
    // google map takes time to load, so it's better to get
    // the data after map is rendered completely
    var map = mapCanvas.data("map");
    if (map) {
        map.panTo(new google.maps.LatLng(
            $(this).data('latitude'),
            $(this).data('longitude')
            ));
    }
});
By using this method, you can have multiple maps with different behaviors on a page.


*/


    window.initMap = function(el) {

      var $el = $(el),
          id = el.id,
          x = $el.data('x'),
          y = $el.data('y'),
          zoom = $el.data('zoom'),
          places = $el.data('places');

      var map = new google.maps.Map(document.getElementById(id),{
        center: new google.maps.LatLng(x,y),
        zoom:zoom,
        scrollwheel: false,
        draggable: true
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(places[0][0],places[0][1]),
        map: map
      });


      // this.addMarkers = function(id){

      //   var map = document.getElementById(id);
      //   var places = $(map).data('places');
      //   var latlngbounds = new google.maps.LatLngBounds();


      //   for (var i = 0; i < places.length; i++) {
      //       var myLatLng = new google.maps.LatLng(places[i][0], places[i][1]);
      //       latlngbounds.extend(myLatLng);
      //       var marker = new google.maps.Marker({
      //           position: myLatLng,
      //           map: map
      //       });
      //   }

      // };



      // this.addMarkers(id);

    }





    jQuery.fn.filebox = function ( options ) {

        var o = $.extend({}, options);

        return this.each(function(e){

          var $el = $(this),
              $btn = $el.find('.filebox-btn'),
              $output = $el.find('.filebox-output'),
              $pic = $el.find('.filebox-pic'),
              $title = $el.find('.filebox-title'),
              $closeBtn = $el.find('.filebox-close'),
              $inputFile = $el.find('input:file');

              if (bowser.msie && bowser.version <= 9) {
                $inputFile.show();
                $btn.hide();
              }

              $btn.on('click',function(e){
                e.preventDefault();
                $inputFile.trigger('click');
              });

              $inputFile.on('change', function(e) {
                readURL(this);
                e.preventDefault();
              });

              $closeBtn.on('click', function(e) {
                e.preventDefault();
                $pic.css('backgroundImage',"none");
                $title.html(' ')
                $btn.css('display','inline-block');
                $output.hide();
                $inputFile.val('');
              });


              (function(el){

                el.addEventListener('dragenter',function(e){
                    e.preventDefault();
                },false)

                el.addEventListener('dragover',function(e){
                    $el.addClass('dragover');
                    e.preventDefault();
                },false);

                el.addEventListener('dragleave',function(e){
                    $el.removeClass('dragover');
                    e.preventDefault();
                },false);

                el.addEventListener('drop', function(e){

                    var dt = e.dataTransfer.files;
                    var name = dt[0].name;
                    var reader = new FileReader();

                    reader.onload = function (e) {
                      $pic.css('backgroundImage',"url("+e.target.result+")");
                      $title.html(name);
                      $btn.hide();
                      $output.css('display','inline-block');
                    };

                    reader.readAsDataURL(dt[0]);
                    $el.removeClass('dragover');
                    e.preventDefault();

                },false)

              })(this);


              function readURL(input){
                if (input.files && input.files[0]) {
                  var reader = new FileReader();
                  var name = input.files[0].name;
                  reader.onload = function (e) {
                    $pic.css('backgroundImage',"url("+e.target.result+")");
                    $title.html(name);
                    $btn.hide();
                    $output.css('display','inline-block');
                  };
                  reader.readAsDataURL(input.files[0]);
                }
              }



        });




    }







})(jQuery, window);


