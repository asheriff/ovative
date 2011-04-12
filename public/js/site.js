// Initialization
//
(function($){
  $.metadata.setType("elem", "script");
  
  // Slideshows
  $(document).ready( function(){
    $(".slides").each(function(){
      $(this).jcarousel(
        $(this).metadata().options
      );
    })
  });
})(jQuery);