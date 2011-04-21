class Routes < Controller
  Ramaze::Route.clear()
  
  Ramaze::Route[%r!(.*).css!] = "%s"
end