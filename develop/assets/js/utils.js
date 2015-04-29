;(function( $, window, undefined ) {


    jQuery.fn.dropdown = function ( opts ) {

        var o = $.extend({
            button: '.dropdown-button',
            menu: '.dropdown-menu',
            buttonTitle: '.dropdown-button-title',
            item: '.dropdown-menu-item',
            itemTitle: '.dropdown-menu-title',
            inputHidden: '.dropdown-hidden',
            active:'active',
            dataAttr:'value'
        }, opts);

        o.dropdown = $(this).selector;

        var $el = $(this), $dropdown, $button, $menu, $buttonTitle, $item, $itemTitle, $inputHidden, val;

        $(document.body).on('click', o.button, function(e){
            $dropdown = $(this).closest(o.dropdown);
            $menu     = $dropdown.find(o.menu);

            if ( !$dropdown.hasClass(o.active) ) {
                $(o.dropdown).removeClass(o.active);
                $(o.dropdown).find(o.menu).hide();
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

        $(document.body).on('click', o.item, function(e){
            $dropdown    = $(this).closest(o.dropdown);
            $buttonTitle = $dropdown.find(o.buttonTitle);
            $menu        = $dropdown.find(o.menu);
            $inputHidden = $dropdown.find(o.inputHidden);

            $menu.hide();
            $buttonTitle.html( $(this).find(o.itemTitle).html() );
            $inputHidden.val( $(this).data(o.dataAttr) );
            $dropdown.removeClass(o.active);

            e.preventDefault();
        });

        function hideDropdown(e){
            if( $(e.target).is(o.dropdown) || $(e.target).is(o.dropdown+' *')) return;
            $(o.menu).hide();
            $(window).off('click', hideDropdown);
            $(o.dropdown).removeClass(o.active);
        }

        return this.each(function(){
            $(this).data("dropdownOptions", o);
            $buttonTitle = $el.find(o.buttonTitle);
            $inputHidden = $el.find(o.inputHidden);
            if( $inputHidden.val() ){
                $item = $el.find(o.item).filter("[data-"+o.dataAttr+" = "+$inputHidden.val()+" ]");
                $buttonTitle.html( $item.html() )
            }
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







    $.fn.filebox = function ( options ) {

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
    };




     /*   $.fn.googleMap = function (options) {

            var el = this,
                x = $(el).data('x'),
                y = $(el).data('y'),
                zoom = $(el).data('zoom'),
                places = $(el).data('places'),
                o = $.extend({

                  mapOptions: {
                    scrollwheel: false,
                    draggable:true
                  },

                  markerOptions: {}

                }, options);

            this.init = function () {

              if( !el[0] ) return;

              var map = new google.maps.Map(el.get(0), $.extend({
                zoom: zoom,
                center: new google.maps.LatLng(x, y)
              }, o.mapOptions));

              this.addMarkers(map, places)

              el.data('map', map);

              return el;

            };

            this.addMarkers = function(_map, _places){
              var latlngbounds = new google.maps.LatLngBounds();
              for (var i = 0; i < _places.length; i++) {
                  var myLatLng = new google.maps.LatLng(_places[i][0], _places[i][1]);
                  latlngbounds.extend(myLatLng);
                  var marker = new google.maps.Marker($.extend({
                    position: myLatLng,
                    map: _map
                    //title:_places[i][2]
                  }, o.markerOptions));
              }
            };


            return this;

        };
    */



})(jQuery, window);


