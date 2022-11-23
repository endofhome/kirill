require 'sinatra'

set :environment, :production

get '/' do
  'Hi from Kirill!'
end
