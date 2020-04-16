class Api::PostsController < ApplicationController

  def index
    @posts = Post.all.with_attached_photos.includes(:user)
    render :index
  end

  def show
    @post = Post.with_attached_photos.includes(:user).find(params[:id])

    if @post
      render :show
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])

    if @post && (@post.user_id == current_user.id || current_user.admin_type)
      @post.destroy
      # attention:
      # render :index
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  private

  def post_params
    params.require(:post).permit(:caption, :location, :user_id, photos: [])
  end

end