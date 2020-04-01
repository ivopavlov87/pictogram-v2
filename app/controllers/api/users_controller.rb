class Api::UsersController < ApplicationController

  # remove before deploy/production
  # skip_before_action :verify_authenticity_token

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
      # render json: @user # this is for testing purposes
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])

    if @user
      render :show
      # render json: @user # this is for testing purposes
    else
      render json: @user.errors.full_messages, status: 404
    end

  end

  def edit

  end

  private
  def user_params
    params.require(:user).permit(:username, :name, :email, :password, :bio, :login_input)
  end

end
