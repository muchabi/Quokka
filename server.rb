require 'sinatra'
require 'sinatra/reloader' if development?

get '/hi' do
  "Hello World"
end

