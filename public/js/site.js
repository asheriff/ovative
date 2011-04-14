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
  $.modal.defaults.containerId = "Modal";
  $.modal.defaults.minHeight = "300px";
  $.modal.defaults.closeClass = "close_modal";
  
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
      var modal = $('#ModalContent').modal();
      
      var show_loading_img = window.setTimeout( function(){
        $('#ModalContent .loading').css({visibility: 'visible'});
      }, 500);
      
      $.get(this.href)
        .success(function(response){
          window.clearTimeout(show_loading_img);
          $('#ModalContent .bd').html(response);
          $('#ModalContent .controls').show();
          modal.update("auto");
        })
        .error(function(xhr, status){
          if( status === "timeout" ){
            $('#ModalContent .bd').html("Opps! This request has timed out.");
          } else{
            $('#ModalContent .bd').html("Opps! An error has occurred.");
          }
          $('#ModalContent .controls').show();
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