# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#                 api_users GET    /api/users(.:format)                                                                     api/users#index {:format=>"json"}
#                           POST   /api/users(.:format)                                                                     api/users#create {:format=>"json"}
#                  api_user PATCH  /api/users/:id(.:format)                                                                 api/users#update {:format=>"json"}
#                           PUT    /api/users/:id(.:format)                                                                 api/users#update {:format=>"json"}
#                api_groups GET    /api/groups(.:format)                                                                    api/groups#index {:format=>"json"}
#                           POST   /api/groups(.:format)                                                                    api/groups#create {:format=>"json"}
#                 api_group GET    /api/groups/:id(.:format)                                                                api/groups#show {:format=>"json"}
#                           PATCH  /api/groups/:id(.:format)                                                                api/groups#update {:format=>"json"}
#                           PUT    /api/groups/:id(.:format)                                                                api/groups#update {:format=>"json"}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>"json"}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>"json"}
#                api_avatar POST   /api/avatar(.:format)                                                                    api/avatars#create {:format=>"json"}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:index, :update, :create]
    resources :groups, only: [:index, :update, :create, :show] do
      resources :group_users, only: [:create]
    end
    resource :session, only: [:create, :destroy]
    resource :avatar, only: [:create]
  end
end
