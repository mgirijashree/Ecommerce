from django.urls import path

from . import views

urlpatterns = [

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

]