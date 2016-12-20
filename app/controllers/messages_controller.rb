class MessagesController < ApplicationController
  def index
  end

  def new
    render "messages/new", layout: false
  end

  def create
    message = current_user.sent_messages.build(message_params)
    message.reciever_id = params[:reciever_id]
    if message.save
      ActionCable.server.broadcast 'chat_channel',
                                   content:  message.content,
                                   username: message.sender.first_name,
                                   created_at: message.created_at
      # head :ok
    else
      redirect_to "/"
    end

  end

  def chat
    @messages = Message.where(sender_id: current_user.id, reciever_id: params[:reciever_id]).or(Message.where(sender_id: params[:reciever_id], reciever_id: current_user.id)).order(created_at: :asc)
    # messages_two = 
    # messages = messages_one + messages_two
    # @messages = messages.order(created_at: :asc)
    if request.xhr?
      render partial: "new"
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :reciever_id)
  end

end