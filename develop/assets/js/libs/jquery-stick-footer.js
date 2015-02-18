(function(){
  var $w = $(window), $h = $('#header'), $c = $('#content'), $f = $('#footer'),
      hh = $h.outerHeight(),
      fh = $f.outerHeight();
  $(window).resize((function(){
    var fn = function(){
      wh = $w.outerHeight();
      $c.css('minHeight', wh - hh - fh);
    };
    fn(); return fn;
  })());
})();