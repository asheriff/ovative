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
    var service_tab = $('<div class="active_item_indicator"><div>&nbsp;</div></div>')
      .appendTo($('#Services'))
      .css({
        position: 'absolute',
        display: 'none'
      })
    ;
    
    $("#Services .slides").jcarousel_content({
      itemExpandCallback: function(c, item){
        var e = $(item);
        var pos = e.offset();
        
        service_tab
          .width( e.width() )
          .css({
            top: pos.top - service_tab.height(),
            left: pos.left
          })
          .show()
        ;
      },
      itemCollapseCallback: function(){
        service_tab.hide();
      }
    });
    
  });
  
})(jQuery);