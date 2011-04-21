require 'rubygems'
require 'ramaze'
require 'faker'
require 'ostruct'
begin
  require 'ruby-debug'
rescue LoadError
end

Ramaze.options.roots = [__DIR__]

require __DIR__('model/init')
require __DIR__('controller/routes')
require __DIR__('controller/init')
