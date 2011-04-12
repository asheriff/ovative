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
    
    @associates = Dir["public/img/team_memebers/*"].to_a.collect do |user|
      OpenStruct.new({
        :image => user.sub("public",""),
        :name => Faker::Name.name,
      })
    end
    
    @associates = [@associates, @associates, @associates].flatten
  end
  
  def clients(id)
    @title = "Client #{id}"
    %(
      %h2= Faker::Lorem.sentence
      - 4.times do
        %p= Faker::Lorem.paragraph(30)
    ).unindent
  end
  
  def associates(id)
    @title = "Associates"
    %(
      %h2= Faker::Name.name
      - 4.times do
        %p= Faker::Lorem.paragraph(30)
    ).unindent
  end
  
  def notemplate
    "there is no 'notemplate.xhtml' associated with this action"
  end
end
