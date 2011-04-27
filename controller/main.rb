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
    3.times do
      Dir["public/img/team_photos/*"].to_a.each_with_index do |user,i|
        @associates << OpenStruct.new({
          :image => user.sub("public",""),
          :name => i!=3 ? Faker::Name.name : "Henry John Temple Viscount Palmerston",
          :title => titles[rand(titles.length-1)]
        })
      end
    end
    @associates = @associates.first(12)
    
    @services = []
    Dir["public/img/icons/ovative/*"].to_a.each_with_index do |service,i|
      @services << OpenStruct.new({
        :image => service.sub("public",""),
        :name => Faker::Company.bs.split(' ')[0,rand>0.3?3:1].map{ |w| w.capitalize }.join(' '),
        :abstract => Faker::Lorem.sentence(10)
      })
    end
  end
  
  def client(id)
    @title = Faker::Company.name
    @paragraphs = id.to_i + 1
    @client = OpenStruct.new({
      :logo => Dir["public/img/client_logos/*"].to_a.shuffle.pop.sub("public","")
    })
    
    %(
      %h2= Faker::Company.bs
      %img{ :src=>@client.logo }
      - @paragraphs.times do
        %p= Faker::Lorem.paragraph(20)
    ).unindent
  end
  
  def portfolio
    @items = []
    
    Dir["public/img/client_logos/*"].each do |client|
      @items << OpenStruct.new({
        :thumb => client.sub("public",""),
        :name => Faker::Company.name,
        :abstract => Faker::Lorem.paragraphs(rand(2)+1).join("\n\n")
      })
    end
    
    @items = [@items, @items].flatten.shuffle
  end
  
  def associates(id)
    sleep(1)
    @paragraphs = id.to_i + 1
    @title = "Associates"
    %(
      %h2= Faker::Name.name
      - @paragraphs.times do
        %p= Faker::Lorem.paragraph(30)
    ).unindent
  end
  
  def notemplate
    "there is no 'notemplate.xhtml' associated with this action"
  end
  
  def error(status='404')
    sleep(1)
    
    case status.to_s
    when 'timeout'
      sleep(20)
    when '404'
      redirect "/file/not/found"
    when '500'
      raise "server error 500"
    else
      "Unknown"
    end
  end
end
