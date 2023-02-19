require 'sinatra'

class Kirill < Sinatra::Base

  get '/' do
    'Hi from Kirill!'
  end

  get '/listen' do
    '<!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Kirill</title>
      </head>
      <body>
        <button id="power-on-button">Power On Button</button>
      </body>
    </html>'
  end

  run! if app_file == $PROGRAM_NAME
end
