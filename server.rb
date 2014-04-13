require 'sinatra'
require 'sinatra/reloader' if development?

set :port, 3030

get '/' do
  erb :index
end

get '/quokka' do
  content_type :js
  erb :"quokka.js"
end

helpers do
  def compress_erb(raw)
    return raw.lines.map { |line|
      line.strip
    }.join
  end
end
