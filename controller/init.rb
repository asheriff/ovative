# Define a subclass of Ramaze::Controller holding your defaults for all
# controllers

class Controller < Ramaze::Controller
  layout :default
  helper :xhtml
  helper :navigation
  helper :html
  engine :Haml
end

# Here go your requires for subclasses of Controller:
require __DIR__('main')
require __DIR__('css_controller')
