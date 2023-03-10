require 'rspec'
require 'rack/test'
require 'wait'

def app
  Kirill
end

describe "Streaming API" do
  include Rack::Test::Methods

  context "note-on endpoint" do
    xit "POST request returns HTTP status 200" do
      response = post '/api/note-on'

      expect(response.status).to eq(200)
      expect(response.body).to eq("OK")
    end
  end

  context "listen endpoint" do
    xit "GET request returns HTTP status 200" do
      app.stream_status = NoEventsStream.new

      response = get '/api/listen'

      expect(response.status).to eq(200)
    end

    xit "GET request returns correct content-type header for Server Sent Events" do
      app.stream_status = NoEventsStream.new

      response = get '/api/listen'

      expect(response.content_type).to eq("text/event-stream;charset=utf-8")
    end
  end

  context "note-on and listen endpoints interacting" do
    xit "correctly formed Server Sent Event is sent for each note-on request" do
      app.stream_status = CancellableStream.new

      # send POST requests to the note-on endpoint repeatedly in the background
      Thread.new {
        100.times do
          post '/api/note-on'
          sleep 0.1
        end
      }
      response = get '/api/listen'

      # I observed some flakiness of this test, probably due to the concurrency involved, hence the `wait` and retry attempts.
      wait = Wait.new(:rescue => RuntimeError, :attempts => 10)
      wait.until do
        # always expect frequency of 100Hz for now, to keep it simple.
        expect(response.body).to eq("event:note-on\ndata:{\"frequency\":100}\n\n")
      end
    end
  end
end

class CancellableStream
  def initialize
    @cancelled = false
  end

  def should_stream
    !@cancelled
  end

  def streamed_one_event
    @cancelled = true
  end
end

class NoEventsStream
  def should_stream
    false
  end

  def streamed_one_event
  end
end