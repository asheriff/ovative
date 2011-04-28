class Routes < Controller
  Ramaze::Route.clear()
  
  Ramaze::Route[%r!(.*).css!] = "%s"
  Ramaze::Route[%r!portfolio/(\d+)!] = "/portfolio/show/%s"
end