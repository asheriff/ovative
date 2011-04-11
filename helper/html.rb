require 'ostruct'

module Ramaze
  module Helper
    module  Html
      def css_position(collection, obj)
        obj == collection.first ? :first :
        obj == collection.last  ? :last :
                                   nil
      end
    end
  end
end