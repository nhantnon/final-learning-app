class MessagesController < ApplicationController
  def index
  end

  def new
    render "messages/new", layout:false
  end

  def create
    message = current_user.messages.build(message_params)

    if message.save
      ActionCable.server.broadcast 'chat_channel',
                                   content:  message.content,
                                   username: message.user.first_name
      head :ok
    else
      "Poop"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

end