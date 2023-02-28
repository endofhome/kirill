require 'sinatra'

class Kirill < Sinatra::Base
  set :root, File.dirname(__FILE__)

  get '/' do
    'Hi from Kirill!'
  end

  get '/listen' do
    erb :listen
  end

  run! if app_file == $PROGRAM_NAME
end
