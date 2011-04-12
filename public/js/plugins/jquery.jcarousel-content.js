(function($){
  
  var defaults = {
    
  };
  
  $(window).bind('load.jcarousel_content', function() { windowLoaded = true; });
  
  $.jcarousel_content = function(e, o){
    this.options = $.extend({}, defaults, o || {});
    
    this.list = $(e);
    this.content_blocks = $('<div class="jcarousel-content-blocks"></div>').insertAfter(this.list).hide();
    
    this.list.find('.jcarousel-content-block').appendTo(this.content_blocks).hide();
    
    var self = this;
    // Hookup events to show content
    this.list.find(".jcarousel-content-show").bind("click", function(){
      self.expand( $(this).closest('.jcarousel-item').index() );
      return false;
    });
    
    this.list.find(".jcarousel-content-hide").bind("click", function(){
      self.collapse( $(this).closest('.jcarousel-item').index(), true );
      return false;
    });
    
    this.list.find(".jcarousel-content-toggle").bind("click", function(){
      alert('toggle');
      return false;
    });
    
  };
  
  // Create shortcut for internal use
  var $jcc = $.jcarousel_content;
  
  $jcc.fn = $jcc.prototype = {
    jcarousel_content: '0.0.1'
  };
  
  $jcc.fn.extend = $jcc.extend = $.extend;

  $jcc.fn.extend({
    /**
     * Shows the +i+th content block
     */
    expand: function(i){
      this.collapse_except(i);
      this.content_blocks.show();
      this.content_blocks.children().eq(i).show();
      this.toggle_links(i);
    },
    
    /**
     * Hide the +i+th content block
     */
    collapse: function(i, hide_parent){
      if( hide_parent){
        this.content_blocks.hide();
      }
      this.content_blocks.children().eq(i).hide();
      this.toggle_links(i);
    },
    
    /**
     * Hide all except the +i+th content block
     */
    collapse_except: function(i){
      this.content_blocks.children()
        .not(this.content_blocks.children().eq(i))
        .hide();
    },
    
    toggle_links: function(i){
      this.list.children().eq(i).find('.jcarousel-content-show, .jcarousel-content-hide').toggle();
    }
  });
  
  $.fn.jcarousel_content = function(o) {
    if (typeof o == 'string') {
      var instance = $(this).data('jcarousel_content'), args = Array.prototype.slice.call(arguments, 1);
      return instance[o].apply(instance, args);
    } else {
      return this.each(function() {
        $(this).data('jcarousel_content', new $jcc(this, o));
      });
    }
  };
  
})(jQuery);
