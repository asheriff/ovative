require 'ostruct'

module Ramaze
  module Helper
    module  Html
      def css_position(collection, obj)
        obj == collection.first ? :first :
        obj == collection.last  ? :last :
                                   nil
      end
      
      def page_class
        css_class = request.env["PATH_INFO"].
          sub('/','').
          gsub(%r!/\d*! ,'').
          gsub('/','_')
        
        css_class = 'home' if css_class == ""
        "page_#{css_class}"
      end
    end
  end
end