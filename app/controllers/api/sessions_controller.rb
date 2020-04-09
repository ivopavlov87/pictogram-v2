class Api::SessionsController < ApplicationController

  # protect_from_forgery unless: -> { request.format.json? }

  def create
    @user = User.find_by_credentials(params[:user][:login_input], params[:user][:password])

    if @user
      login(@user)
      # render "api/users/show"
      render :show # this routes to "api/users/show"
      # render json: @user # this is for testing purposes
    else
      render json: ["Invalid credentials"], status: 401
    end
  end

  def destroy
    @user = current_user

    if @user
      logout
      # render "api/users/show"
      render :show # this routes to "api/users/show"
      # render json: ["Successfully logged out"] # this is for testing purposes
    else
      render json: ["No user is signed in"], status: 404
    end
  end
end
