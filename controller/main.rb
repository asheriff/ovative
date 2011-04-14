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
    
    titles = [
      "Director of Juggling",
      "President and CEO",
      "CFO",
      "Senior Vice President, Gnome Wrangling",
      "Associate Gnome Wranger",
    ]
    
    @associates = []
    Dir["public/img/team_memebers/*"].to_a.each_with_index do |user,i|
      3.times do
        @associates << OpenStruct.new({
          :image => user.sub("public",""),
          :name => i!=3 ? Faker::Name.name : "Henry John Temple Viscount Palmerston",
          :title => titles[rand(titles.length-1)]
        })
      end
    end
    @associates.shuffle!
    
    @services = []
    Dir["public/img/icons/ovative/*"].to_a.each_with_index do |service,i|
      @services << OpenStruct.new({
        :image => service.sub("public",""),
        :name => Faker::Company.bs.split(' ')[0,rand>0.3?1:3].map{ |w| w.capitalize }.join(' '),
        :abstract => Faker::Lorem.sentence(10)
      })
    end
  end
  
  def client(id)
    @title = Faker::Company.name
    %(
      %h2= Faker::Company.bs
      - 4.times do
        %p= Faker::Lorem.paragraph(20)
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
