class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end
  
  def index
    @comments = Comment.all
    render :index
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment && (@comment.user_id == current_user.id || current_user.admin_type)
      @comment.destroy
      render json: ["Comment deleted"]
    else
      render json: @comment.errors.full_messages, status: 404
    end
  end

  private

  def comment_params
    p "params"
    p params
    params.require(:comment).permit(:body, :user_id, :post_id)
  end

end