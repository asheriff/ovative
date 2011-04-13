(function($){
  
  var defaults = {
    collapseOnScroll: true
  };
  
  $(window).bind('load.jcarousel_content', function() { windowLoaded = true; });
  
  $.jcarousel_content = function(e, o){
    var self = this;
    this.options = $.extend({}, defaults, o || {});
    
    this.list = $(e);
    this.jcarousel = this.list.data('jcarousel');
    this.expended_index = null;
    this.content_block_container = $('<div class="jcarousel-content-blocks"></div>').insertAfter(this.list).hide();
    
    this.list.find('.jcarousel-content-block').appendTo(this.content_block_container).hide();
    
    
    // Hookup events
    
    this.list.find(".jcarousel-content-show").bind("click", function(){
      self.expand( $(this).closest('.jcarousel-item').index() );
      return false;
    });
    
    this.list.find(".jcarousel-content-hide").bind("click", function(){
      self.collapse( $(this).closest('.jcarousel-item').index(), true );
      return false;
    });
    
    this.list.find(".jcarousel-content-toggle").bind("click", function(){
      self.toggle( $(this).closest('.jcarousel-item').index(), true );
      return false;
    });
    
    // IMPROVE: This will clobber any callbacks already on the jcarousel.  It
    // should probably save a reference to the existing obj and call it.
    this.jcarousel.options.itemFirstOutCallback = {
      onBeforeAnimation: function(){
        if( self.options.collapseOnScroll ){
          self.collapse_current(true);
        }
      }
    };
  };
  
  // Create shortcut for internal use
  var $jcc = $.jcarousel_content;
  
  $jcc.fn = $jcc.prototype = {
    jcarousel_content: '0.0.1'
  };
  
  $jcc.fn.extend = $jcc.extend = $.extend;

  $jcc.fn.extend({
    /**
     * Shows the +i+th content block.
     */
    expand: function(i){
      if( this.expended_index !== null ){
        this.collapse(this.expended_index);
      }
      this.content_block_container.show();
      this.content_block_container.children().eq(i).show(200);
      this.toggle_links(i);
      this.expended_index = i;
    },
    
    /**
     * Hide the +i+th content block.
     */
    collapse: function(i, hide_parent){
      if( hide_parent ){
        this.content_block_container.hide();
      }
      this.content_block_container.children().eq(i).hide();
      this.toggle_links(i);
      this.expended_index = null;
    },
    
    /**
     * Hide the current expanded content block.
     */
    collapse_current: function(hide_parent){
      if( this.expended_index === null ) return;
      this.collapse( this.expended_index, hide_parent );
    },
    
    /**
     * Toggles the +i+th content block.
     */
    toggle: function(i, hide_parent){
      if( i === this.expended_index ){
        this.collapse_current(hide_parent);
      } else{
        this.expand(i);
      }
    },
    
    /**
     * Toggles show/hide links in +i+th content block.
     */
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
