from django.urls import path

from .views import (
    product_list,
    ProductDetailView,
    OrderCreateView,
    create_payment,
    track_order,
    order_list,
    UpdateOrderStatusView,
    
)

from . import views


urlpatterns = [

    path(
        '',
        views.home_view,
        name='home'
    ),


    path(
        "register/",
        views.register,
    ),


    path(
        "login/",
        views.login_user,
    ),


    path(
        "chat/",
        views.chat,
        name="chat"
    ),


    path(
        "chatbot/",
        views.chatbot,
        name="chatbot"
    ),


    path(
        "api/contact/",
        views.contact_submit,
        name="contact-submit"
    ),


    # Product APIs

    path(
    "api/products/",
    product_list,
    name="product-list"
    ),


    path(
    "api/categories/",
    views.category_list,
    name="category-list"
    ),


    path(
    "api/products/<int:pk>/",
    ProductDetailView.as_view(),
    name="product-detail"
    ),



    # Order API

    path(
        "api/orders/",
        OrderCreateView.as_view(),
        name="order-create"
    ),


    path(
    "api/payment/create/",
    create_payment,
    name="create-payment"
    ),

    path(
    "api/orders/<int:pk>/",
    track_order,
    name="track-order"
),

path(
    "api/orders/list/",
    order_list,
    name="order-list"
),
    





]