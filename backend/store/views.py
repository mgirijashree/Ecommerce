
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from django.shortcuts import render
from .models import Product,Category
from django.http import JsonResponse, HttpResponse

def home(request):
    return HttpResponse("""
    <h1>E-Commerce Website</h1>
    <h2>Deployment Successful ✅</h2>

    <hr>

    <h3>Available Pages</h3>

    <ul>
        <li><a href="/products/">Products API</a></li>
        <li><a href="/categories/">Categories API</a></li>
        <li><a href="/admin/">Admin Panel</a></li>
    </ul>
    """)

def product_list(request):

    category_id = request.GET.get("category")

    products = Product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    data = []

    for product in products:

        image = ""

        if product.image:
            image = f"https://ecommerce-7jru.onrender.com{product.image.url}"

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock": product.stock,
            "image": image,
            "category": product.category.id,
            "category_name": product.category.name,
        })

    return JsonResponse({
        "products": data
    })

    category_id = request.GET.get("category")

    products = Product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    data = []

    for product in products:

        image = ""

        if product.image:
            if product.image:
                if request.get_host() == "ecommerce-7jru.onrender.com":
                    image = f"https://ecommerce-7jru.onrender.com{product.image.url}"
                else:
                    image = request.build_absolute_uri(product.image.url)

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock": product.stock,
            "image": image,
            "category": product.category.id,
            "category_name": product.category.name,
        })

    return JsonResponse({
        "products": data
    })

    category_id = request.GET.get("category")

    products = Product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    data = []

    for product in products:

        image = ""

        if product.image:
            image = request.build_absolute_uri(product.image.url)

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock": product.stock,
            "image": image,
            "category": product.category.id,
            "category_name": product.category.name,
        })

    return JsonResponse({
        "products": data
    })

    category_id = request.GET.get("category")

    products = Product.objects.all()

    if category_id:
        products = products.filter(category_id=category_id)

    data = []

    for product in products:

        image = ""

        try:
            if product.image:
                image = product.image.url
        except:
            image = ""

        data.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": float(product.price),
            "stock": product.stock,
            "image": image,
            "category": product.category.id,
            "category_name": product.category.name,
        })

    return JsonResponse({"products": data})


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
def register_user(request):

    if request.method == "POST":

        data = json.loads(request.body)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        address = data.get("address")


        # Check existing user
        if User.objects.filter(username=username).exists():

            return JsonResponse(
                {
                    "success": False,
                    "message": "Username already exists"
                },
                status=400
            )


        # Create User
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )


        # Create Profile with Address
        UserProfile.objects.create(
            user=user,
            address=address
        )


        return JsonResponse(
            {
                "success": True,
                "message": "Registration successful"
            }
        )


    return JsonResponse(
        {
            "message": "POST request required"
        }
    )


@csrf_exempt
def login_user(request):

    if request.method=="POST":

        data=json.loads(request.body)


        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )


        if user:

            login(request,user)


            profile = UserProfile.objects.get(
                user=user
            )


            return JsonResponse({

                "success": True,

                "username": user.username,

                "address": profile.address

            })


        return JsonResponse(
            {
                "success":False,
                "message":"Invalid username or password"
            },
            status=401
        )

    if request.method == "POST":

        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")


        user = authenticate(
            request,
            username=username,
            password=password
        )


        if user is not None:

            login(request, user)

            return JsonResponse({
                "success": True,
                "message": "Login successful",
                "username": user.username
            })


        else:

            return JsonResponse({
                "success": False,
                "message": "Invalid username or password"
            }, status=401)


    return JsonResponse({
        "message":"Only POST allowed"
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