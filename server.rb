require 'sinatra'
require 'sinatra/reloader' if development?
require 'sass'

set :port, 3030
set :protection, :except => :frame_options

status_bool = true

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
  erb :"d_#{params[:name]}", layout: :dialog_layout, :locals => {:status_bool => status_bool}
end

get '/download/:filename' do
  send_file "./files/#{params[:filename]}", :filename => params[:filename], :type => 'Application/octet-stream'
end

get '/helper' do
  status_bool = true
  erb :helper
end

get '/h/status' do
  return status_bool.to_s
end

get '/h/on' do
  status_bool = true
  puts status_bool
  redirect '/h/status'
end

get '/h/off' do
  status_bool = false
  puts status_bool
  redirect '/h/status'
end


helpers do
  def compress_erb(raw)
    return raw.lines.map { |line|
      line.strip
    }.join
  end
end
