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
      render json: ['You must be signed in'], status: 401 # Unauthorized
    end
  end

  def index
    @groups = Group.includes(:group_users).all
  end

  def show
    @group = find_full_group(params[:id])
    if @group
      render :show
    elsif
      render json:['Group not found'], status: 404
    end
  end

  def update
    if logged_in?
      @group = Group.find_by_id(params[:id])
      if @group.members.merge(GroupUser.organizers).include?(current_user)
        if @group.update(group_params)
          render :show
        else
          render json: @group.errors.full_messages, status: 422
      end
      else
        render json: ['You must be the organizer of this group'],
               status: 401 # Unauthorized
      end
    else
      render json: ['You must be signed in'], status: 401 # Unauthorized
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, :description, :hometown)
  end
end
