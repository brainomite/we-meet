class Api::GroupsController < ApplicationController
  def create
  end

  def index
    @groups = Group.all
  end

  def show
  end

  def update
  end
end
