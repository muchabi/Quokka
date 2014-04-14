require 'sinatra'
require 'sinatra/reloader' if development?

set :port, 3030
set :protection, :except => :frame_options

get '/' do
  erb :index
end

get '/quokka' do
  content_type :js
  erb :"bookmarklet.js"
end

get '/d/:name' do
  erb :"d_#{params[:name]}", layout: :dialog_layout
end

helpers do
  def compress_erb(raw)
    return raw.lines.map { |line|
      line.strip
    }.join
  end
end
