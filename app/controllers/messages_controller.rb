class MessagesController < ApplicationController
  def index
  end

  def new
    render "messages/new", layout: false
  end

  def create
    message = current_user.sent_messages.build(message_params)
    if message.save
      ActionCable.server.broadcast 'chat_channel',
                                   content:  message.content,
                                   username: message.sender.first_name
      # head :ok
    else
      redirect_to "/"
    end

  end

  def chat
    if request.xhr?
      render partial: "new"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :reciever_id)
  end

end