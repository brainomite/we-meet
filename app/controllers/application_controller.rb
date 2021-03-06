class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user(refresh=false)
    if refresh
      @current_user = nil;
    end
    @current_user ||= User.includes(groups: :group_users)
                          .find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def find_full_group(id)
    @full_group ||= Group.includes(
      :group_users,
      :member_types,
      members: {
        avatar_attachment: :blob
      }
    ).find_by_id(id)
  end

end
