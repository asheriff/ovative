////////////////////////////////////////////////////////////////////////////////
// Config
////////////////////////////////////////////////////////////////////////////////
(function($){
  //
  // Ajax
  //
  $.ajaxSetup({
    timeout: 5*1000
  });
  
  //
  // Modal popin
  //
  $.modal.defaults.opacity = 30;
  $.modal.defaults.overlayId = "ModalOverlay";
  $.modal.defaults.containerId = "Modal"
  $.modal.defaults.minHeight = "300px"
  
})(jQuery);

////////////////////////////////////////////////////////////////////////////////
// Initialization
////////////////////////////////////////////////////////////////////////////////
(function($){
  $.metadata.setType("elem", "script");
  
  $(document).ready( function(){
    //
    // Links
    //
    $('A[rel~=modal]').live('click', function(){
      var modal = $.modal('<div id="ModalContent"><div class="loading"><img src="/img/ajax_loading.gif" alt="Loading..."/><div class="text">Loading...</div></div></div>');
      
      var show_loading_img = window.setTimeout( function(){
        $('#ModalContent .loading').css({visibility: 'visible'});
      }, 500);
      
      $.get(this.href)
        .success(function(response){
          window.clearTimeout(show_loading_img);
          $('#ModalContent').html(response);
          modal.update("auto");
        })
        .error(function(xhr, status){
          if( status === "timeout" ){
            $('#ModalContent').html("Opps! This request has timed out.");
          } else{
            $('#ModalContent').html("Opps! An error has occurred.");
          }
          window.clearTimeout(show_loading_img);
          modal.update("auto");
        })
      ;
      
      return false;
    });
    
    //
    // Slideshows
    //
    $(".slides").each(function(){
      var $$ = $(this);
      
      $$.jcarousel( $$.metadata().jcarousel_options || {
        visible: 4,
        scroll: 4
      });
    });
    
    //
    // Services Slideshow Content
    //
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