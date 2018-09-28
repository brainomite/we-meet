class Api::UsersController < ApplicationController
  # we don't need a list of all users.

  # def index
  #   @users = User.all
  # end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    if logged_in? and current_user.id == params(:id)
      render :show
    elsif logged_in?
      render json: ["Your admin-fu is too low, forbidden."], status: 403
    else
      render json: ["Not signed in."], status: 401
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :email, :hometown_id)
  end
end
