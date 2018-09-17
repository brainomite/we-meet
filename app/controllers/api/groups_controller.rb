class Api::GroupsController < ApplicationController
  def create
    # possible n+1 query here, however there will only ever
    # be 1 record in each joined table during the show
    if logged_in?
      @group = Group.new(group_params)
      @group.group_users_attributes = [
        {
          user_id: current_user.id,
          member_type_id: MemberType.organizer.id
        }
      ]
      if @group.save
        render :show
      elsif
        render json: @group.errors.full_messages, status: 422
      end
    elsif
      render json: ['Must be signed in'], status: 401 # Unauthorized
    end
  end

  def index
    @groups = Group.all
  end

  def show
    @group = Group.includes(:members, :group_users, :member_types)
      .find_by_id(params[:id])
  end

  def update
  end

  private

  def group_params
    params.require(:group).permit(:name, :description, :hometown)
  end
end
