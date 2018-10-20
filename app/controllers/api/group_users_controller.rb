class Api::GroupUsersController < ApplicationController
  def create
    if logged_in?
      @group = find_full_group(params[:group_id])
      if @group
        unless @group.members.include?(current_user)
          @group.members << current_user
        end
        current_user(true)
        render "api/groups/show"
      elsif
        render json:['Group not found'], status: 404
      end
    else
      render json:['Not logged in'], status: 401
    end
  end

  def destroy

    if logged_in?
      @group = find_full_group(params[:group_id])
      if @group
        # find out if current_user is an organizer
        unless @group.members.merge(GroupUser.organizers)
                              .include?(current_user)
          @group.members.delete(current_user)
          current_user(true)
          render "api/groups/show"
        else
          msg = 'Organizers may not leave, you made your bed, now sleep in it'
          render json:[msg], status: 403
        end
      elsif
        render json:['Group not found'], status: 404
      end
    else
      render json:['Not logged in'], status: 401
    end
  end
end
