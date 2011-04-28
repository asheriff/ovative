class PortfolioController < Controller
  map '/portfolio'
  
  def index
    @items = []
    
    Dir["public/img/portfolio/thumbs/*"].each_with_index do |client, index|
      @items << OpenStruct.new({
        :id => index+1,
        :thumb => client.sub("public",""),
        :name => Faker::Company.name,
        :abstract => Faker::Lorem.paragraphs(rand(2)+1).join("\n\n")
      })
    end
    
    @items = [@items, @items].flatten.shuffle
  end
  
  def show(id)
    %(
      .block
        %img{ :src=>"/img/portfolio/large/#{id}.gif" }
        %p= Faker::Lorem.paragraph(2)
    ).unindent
  end
end