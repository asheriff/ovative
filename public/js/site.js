// Initialization
//
(function($){
  $.metadata.setType("elem", "script");
  
  // Slideshows
  $(document).ready( function(){
    $(".slides").each(function(){
      var $$ = $(this);
      
      $$.jcarousel( $$.metadata().jcarousel_options || {
        visible: 4,
        scroll: 4
      });
    });
  });
})(jQuery);