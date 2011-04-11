class MainController < Controller
  def index
    @enterprise_clients = []
    
    Dir["public/img/client_logos/*"].each do |client|
      @enterprise_clients << OpenStruct.new({
        :logo => client.sub("public","")
      })
    end
    
    @enterprise_clients = [@enterprise_clients, @enterprise_clients, @enterprise_clients].flatten
    @emerging_clients = @enterprise_clients.reverse
  end
  
  def notemplate
    "there is no 'notemplate.xhtml' associated with this action"
  end
end
