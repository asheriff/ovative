require 'ostruct'

module Ramaze
  module Helper
    module  Navigation
      def main_nav(selected_index=nil)
        links = 
          [ ["/",         "Who We Are"],
            ["/blog",     "Blog"],
            ["/tools",    "Toolbox"],
            ["/contact",  "Contact"],
            ["/clients",  "Clients"],
          ].map{ |link| OpenStruct.new( :href=>link[0], :name=>link[1] ) }
        
        if selected_index
          links.each_with_index{ |link,i| link.selected = true if i==selected_index }
        else
          links.each{ |link| link.selected = true if link.href == request.env["PATH_INFO"] }
        end
      end
    end
  end
end
          