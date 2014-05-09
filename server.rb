require 'sinatra'
require 'sinatra/reloader' if development?
require 'sass'

set :port, 3030
set :protection, :except => :frame_options

get '/' do
  erb :download
end

get '/download' do
  erb :download
end

get '/dev' do
  erb :dev
end

get '/quokka' do
  content_type :js
  erb :"bookmarklet.js"
end

get '/d/:name' do
  erb :"d_#{params[:name]}", layout: :dialog_layout
end

get '/download/:filename' do
  send_file "./files/#{params[:filename]}", :filename => params[:filename], :type => 'Application/octet-stream'
end

get '/h/audio' do
  erb :"h_audio"
end

helpers do
  def compress_erb(raw)
    return raw.lines.map { |line|
      line.strip
    }.join
  end
end
