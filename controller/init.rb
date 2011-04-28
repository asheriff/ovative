# Define a subclass of Ramaze::Controller holding your defaults for all
# controllers

class Controller < Ramaze::Controller
  layout :default
  helper :xhtml
  helper :navigation
  helper :html
  engine :Haml
  
  layout do |path, wish|
    case
      when request.xhr? then nil
      else :default
    end
  end
end

# Here go your requires for subclasses of Controller:
require __DIR__('main')
require __DIR__('portfolio')
require __DIR__('css_controller')
