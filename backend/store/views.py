
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from django.shortcuts import render
from .models import Product,Category


def product_list(request):

    category_id = request.GET.get("category")

    products = Product.objects.all()


    if category_id:
        products = products.filter(
            category_id=category_id
        )


    data = []

    for product in products:

        data.append({

            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "stock": product.stock,
            "image": product.image.url if product.image else "",
            "category": product.category.id,
            "category_name": product.category.name

        })


    return JsonResponse({
        "products": data
    })


def category_list(request):

    categories = list(
        Category.objects.values(
            "id",
            "name"
        )
    )

    return JsonResponse({
        "categories": categories
    })



@csrf_exempt
def register_view(request):

    if request.method != "POST":
        return JsonResponse({"success": False})

    data = json.loads(request.body)

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.objects.filter(username=username).exists():
        return JsonResponse({
            "success": False,
            "message": "Username already exists"
        })

    User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return JsonResponse({
        "success": True,
        "message": "Registration Successful"
    })


@csrf_exempt
def login_view(request):

    if request.method != "POST":
        return JsonResponse({"success": False})

    data = json.loads(request.body)

    username = data.get("username")
    password = data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is None:

        return JsonResponse({
            "success": False,
            "message": "Invalid Username or Password"
        })

    login(request, user)

    return JsonResponse({
        "success": True,
        "username": user.username
    })


def logout_user(request):

    logout(request)

    return JsonResponse({
        "success": True
    })


def current_user(request):

    if request.user.is_authenticated:

        return JsonResponse({
            "loggedIn": True,
            "username": request.user.username
        })

    return JsonResponse({
        "loggedIn": False
    })