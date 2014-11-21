window.helpers = {

    local: {
        site: function(){},
    },


    browser: {
        ie: function(){
            if( browser[0] == "MSIE" ){
                if ( browser[1] < 9 ){
                    //ie < 9
                }
            }
        },
        mobile: function(){
            if ( isMobile.any() ) {
                //$('body').addClass('mobile')
            }
        }
    },


    forms: {

        formControls: function(){
            $('.c-input').focus(function() {
                $(this).removeClass('c-input-error');
                $(this).closest('.c-input-outer').removeClass('c-input-error');
                $(this).next(".form-tip-error").hide();
                $(this).closest('.c-input-outer').next(".form-tip-error").hide();
            });
        }
    },


    tools: {
        forEach: function(list, callback) {
            for (var n = 0; n < list.length; n++) {
                callback.call(list[n],n);
            }
        }
    },


    plugins: {

        rangeSlider: {
            setVal: function(obj){
                var $outer = obj.input.closest('.c-range-outer-simple'),
                    $outputMin = $outer.find('.c-range-output-min'),
                    $outputMax = $outer.find('.c-range-output-max');
                $outputMin.val(obj.fromNumber);
                $outputMax.val(obj.toNumber);
            }
        },

        googleMaps: {

            init: function(opts){

                //Опции
                var o = $.extend({
                    id:'map',
                    zoom:10,
                    centerY:59.9174454,
                    centerX:30.3250575,
                    places: [],
                    scrollwheel: false,
                    draggable:true,
                    styles: null,
                    stylesName:"Styled Map",
                    markerImgUrl:null,
                    markerWidth:null, //ширина маркера
                    markerHeight:null, //высота маркера
                    markerOffsetX:null, //расстояние слева до главной точки маркера
                    markerOffsetY:null, //расстояние сверху до главной точки маркера
                    animation: null
                }, opts);


                //Инициализация
                if ( !document.getElementById(o.id) ) return;

                this.map = new google.maps.Map(document.getElementById(o.id),{
                    center: new google.maps.LatLng(o.centerY,o.centerX),
                    zoom:o.zoom,
                    scrollwheel: o.scrollwheel,
                    draggable: o.draggable,
                    mapTypeControlOptions: {
                      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                    }
                });
                this.places = o.places;
                this.markers = [];
                this.infoWindow = new google.maps.InfoWindow();

                if( o.styles ){ //Добавляем стили
                    var styledMap = new google.maps.StyledMapType(o.styles,
                      {name: o.stylesName});
                    this.map.mapTypes.set('map_style', styledMap);
                    this.map.setMapTypeId('map_style');
                }


                //Методы

                //Добавляем маркеры
                this.addMarkers = function(places){
                    var map = this.map;
                    var markers = this.markers;
                    var latlngbounds = new google.maps.LatLngBounds();

                    if ( o.markerImgUrl ) { //меняем изображение маркеров
                        var image = new google.maps.MarkerImage(o.markerImgUrl,
                            new google.maps.Size(o.markerWidth, o.markerHeight),
                            new google.maps.Point(0, 0)
                            //new google.maps.Point(o.markerOffsetX, o.markerOffsetY)
                        );
                    }

                    for (var i = 0; i < places.length; i++) {
                        var myLatLng = new google.maps.LatLng(places[i][1], places[i][2]);
                        latlngbounds.extend(myLatLng);
                        var marker = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            title: places[i][0],
                            icon: o.markerImgUrl ? image : null,
                            animation: o.animation,
                            contentPic:places[i][3],
                            contentPrice:places[i][4],
                            contentAddress:places[i][5]
                        });
                        markers.push(marker);
                    }
                    this.addDefaultActions();
                };



                //Удаляем маркеры
                this.removeMarkers = function(){
                    var map = this.map;
                    var markers = this.markers;
                    google.maps.Map.prototype.clearOverlays = function() {
                      for (var i = 0; i < markers.length; i++ ) {
                        markers[i].setMap(null);
                      }
                      markers.length = 0;
                    }
                    map.clearOverlays();
                };



                //Удаляем и добавляем маркеры
                this.removeAndAddMarkers = function(places){
                    this.removeMarkers();
                    this.addMarkers(places);
                };



                //Добавляем события к маркерам
                this.addDefaultActions = function(){
                    var map = this.map;
                    var markers = this.markers;
                    //путь к спрайту, размеры одного маркера в спрайте, background-position, смещение маркера (left, top)
                    var icon1 = new google.maps.MarkerImage("/assets/images/map-marker-sprite.png", new google.maps.Size(27, 40), new google.maps.Point(0, 0), new google.maps.Point(14, 40));
                    var icon2 = new google.maps.MarkerImage("/assets/images/map-marker-sprite.png", new google.maps.Size(27, 40), new google.maps.Point(28, 0), new google.maps.Point(14, 40));
                    var iw = this.infoWindow;
                    var popUpMarkUp = this.popUpMarkUp;


                    helpers.tools.forEach(markers, function(i){

                        google.maps.event.addListener(markers[i], 'mouseover', function() {
                            if (iw.content) return;
                            this.setIcon(icon2);
                        });

                        google.maps.event.addListener(markers[i], 'mouseout', function() {
                            if (iw.content) return;
                            this.setIcon(icon1);
                        });

                        google.maps.event.addListener(markers[i], 'click', function() {
                            for (var i = 0; i < markers.length; i++) {
                               markers[i].setIcon(icon1);
                            }
                            this.setIcon(icon2);
                            iw.setContent( popUpMarkUp(this.contentPic, this.title, this.contentPrice, this.contentAddress) );
                            iw.open(map,this);
                            map.panTo(new google.maps.LatLng( this.getPosition().lat(), this.getPosition().lng() ));
                        });

                    });

                    google.maps.event.addListener(map, 'click', function(){
                        iw.close();
                        iw.content = undefined;
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].setIcon(icon1);
                        }
                    });

                    google.maps.event.addListener(iw, 'closeclick', function() {
                        this.content = undefined;
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].setIcon(icon1);
                        }
                    });



                };

                //Верстка попапа
                this.popUpMarkUp = function(pic, title, price, address){
                    return "<div class='c-map-popup'> <div class='c-map-popup'> <div class='c-map-popup-pic'> "+pic+" </div> <div class='c-map-popup-title'> "+title+" </div> <div class='c-map-popup-price'> "+price+" </div> <div class='c-map-popup-address'> "+address+" </div> </div> </div> </div>";
                };



            },

            data: {
                places1: [
                    [
                        "Мерчендайзер (соки, снеки)",
                        59.9369183,
                        30.3230151,
                        "<img src='/assets/images/pic-map-ico.jpg' />",
                        "от 26 000 руб. ",
                        "АРЕС, Санкт-Петербург "
                    ],
                    [
                        "Менеджер",
                        59.9377567,
                        30.3221354,
                        "<img src='/assets/images/pic-map-ico.jpg' />",
                        "от 26 000 руб.",
                        "АРЕС, Санкт-Петербург"
                    ]
                ],
                places2: [
                    [
                        "Мерчендайзер",
                        59.9376654,
                        30.3250751,
                        "<img src='/assets/images/pic-map-ico.jpg' />",
                        "от 26 000 руб.",
                        "АРЕС, Санкт-Петербург"
                    ],
                    [
                        "Мерчендайзер",
                        59.938047,
                        30.3239807,
                        "<img src='/assets/images/pic-map-ico.jpg' />",
                        "от 26 000 руб.",
                        "АРЕС, Санкт-Петербург"
                    ]

                ]
            },

            actions: function(){

                $('#map-btn-1').click(function(e) {
                    e.preventDefault();
                    if(google.maps.markers[0] == undefined) return;
                    google.maps.map.panTo(new google.maps.LatLng( google.maps.markers[0].getPosition().lat(), google.maps.markers[0].getPosition().lng() ));
                    google.maps.map.setZoom(16);
                });

                $('#map-btn-2').click(function(e) {
                    google.maps.addMarkers( helpers.plugins.googleMaps.data.places1 );
                    e.preventDefault();
                });

                $('#map-btn-3').click(function(e) {
                    google.maps.addMarkers( helpers.plugins.googleMaps.data.places2 );
                    e.preventDefault();
                });

                $('#map-btn-4').click(function(e) {
                    google.maps.removeAndAddMarkers( helpers.plugins.googleMaps.data.places1 );
                    e.preventDefault();
                });

                $('#map-btn-5').click(function(e) {
                    google.maps.removeMarkers();
                    e.preventDefault();
                });

            }

        }



    }


}