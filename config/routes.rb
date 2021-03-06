Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resources :posts, only: [:create, :show, :index, :update, :destroy] do
      resources :comments, only: [:create, :index, :show, :update, :destroy]
    end
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end
