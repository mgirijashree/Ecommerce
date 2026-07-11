from django.urls import path
from . import views

urlpatterns = [

    path("products/", views.product_list, name="products"),

    path("categories/", views.category_list, name="categories"),

    path("register/", views.register, name="register"),

    path("login/", views.login_user, name="login"),

    path("logout/", views.logout_user, name="logout"),

    path("current-user/", views.current_user, name="current_user"),

    path('api/register/', views.register_view,name="register"),
    path('api/login/', views.login_view,name="login"),
]