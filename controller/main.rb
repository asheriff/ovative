class MainController < Controller
  def index
    @enterprise_clients = []
    
    Dir["public/img/client_logos/*"].each do |client|
      @enterprise_clients << OpenStruct.new({
        :logo => client.sub("public","")
      })
    end
    
    @enterprise_clients = [@enterprise_clients, @enterprise_clients].flatten
    @emerging_clients = @enterprise_clients.reverse
  end
  
  def clients(id)
    @title = "Client #{id}"
    %(
      %h2= Faker::Lorem.sentence
      - 4.times do
        %p= Faker::Lorem.paragraph(30)
    ).unindent
  end
  
  def notemplate
    "there is no 'notemplate.xhtml' associated with this action"
  end
end
