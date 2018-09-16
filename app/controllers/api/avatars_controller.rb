class Api::AvatarsController < ApplicationController
  def create
    if logged_in?
      @user = current_user
      @user.avatar.attach(params.require(:avatar))
      render 'api/users/show'
    else
      render json: ["Not presently logged in!"], status: 422
    end
  end
end
