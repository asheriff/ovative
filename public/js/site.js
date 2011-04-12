// Initialization
//
(function($){
  $.metadata.setType("elem", "script");
  
  $(document).ready( function(){
    ////////////////////////////////////////////////////////////////////////////
    // Slideshows
    ////////////////////////////////////////////////////////////////////////////
    $(".slides").each(function(){
      var $$ = $(this);
      
      $$.jcarousel( $$.metadata().jcarousel_options || {
        visible: 4,
        scroll: 4
      });
    });
    
    ////////////////////////////////////////////////////////////////////////////
    // Services Slideshow Content
    ////////////////////////////////////////////////////////////////////////////
    var foo = $("#Services .slides").jcarousel_content().data("jcarousel_content");
    // foo.show(2);
    
  });
  
})(jQuery);