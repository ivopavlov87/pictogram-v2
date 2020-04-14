class Api::UsersController < ApplicationController

  # remove before deploy/production
  # skip_before_action :verify_authenticity_token

  # protect_from_forgery unless: -> { request.format.json? }

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:posts).find(params[:id])
    @posts = @user.posts

    if @user
      render :show, status: 200
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :name, :email, :password, :bio, :login_input, :profile_picture)
  end

end
