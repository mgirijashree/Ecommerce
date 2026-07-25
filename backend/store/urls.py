from django.urls import path

from . import views

urlpatterns = [

    path('', views.home_view, name='home'),

    path(
        "register/",
        views.register,
    ),

    path(
        "login/",
        views.login_user,
    ),

    path("chat/", views.chat, name="chat"),

    path("chatbot/", views.chatbot, name="chatbot"),

    path("products/", views.product_list, name="product-list"),

]