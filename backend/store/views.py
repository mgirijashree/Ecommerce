from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .chatbot import build_database_context
from .search import search_products, product_context
from .ai import ask_ai
from .models import Product
from django.shortcuts import render

import json


def home_view(request):
    return render(request, 'store/home.html')

def product_list(request):

    products = Product.objects.all()

    data = [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": str(p.price),
            "image": p.image.url if p.image else "",
        }
        for p in products
    ]

    return JsonResponse(data, safe=False)


@csrf_exempt
def register(request):

    if request.method == "POST":

        try:
            data = json.loads(request.body)
        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse({"error": "Invalid JSON body"}, status=400)

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return JsonResponse(
                {"error": "Username, email and password are all required"},
                status=400,
            )

        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"error": "That username is already taken"},
                status=400,
            )

        if User.objects.filter(email=email).exists():
            return JsonResponse(
                {"error": "That email is already registered"},
                status=400,
            )

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        return JsonResponse({
            "message": "Registration Successful"
        })

    return JsonResponse({

        "error": "Invalid Request"

    }, status=405)



@csrf_exempt
def login_user(request):

    if request.method == "POST":

        try:
            data = json.loads(request.body)
        except (json.JSONDecodeError, UnicodeDecodeError):
            return JsonResponse({"error": "Invalid JSON body"}, status=400)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(
            username=username,
            password=password
        )

        if user:
            return JsonResponse({
                "success": True,
                "username": user.username
            })

        return JsonResponse({
            "success": False,
            "message": "Invalid username or password"
        })

    return JsonResponse({
        "message": "Only POST request allowed"
    })




@csrf_exempt
def chat(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "POST request required"},
            status=405
        )

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    message = data.get("message", "").lower()

    if "ring" in message:
        reply = "We have Gold Rings, Diamond Rings and Wedding Rings."

    elif "necklace" in message:
        reply = "We offer Gold Necklaces, Diamond Necklaces and Bridal Sets."

    elif "bracelet" in message:
        reply = "Our bracelet collection includes Gold, Silver and Diamond bracelets."

    elif "category" in message:
        reply = "Our categories include Rings, Earrings, Necklaces, Bracelets and Pendants."

    elif "hello" in message or "hi" in message:
        reply = "Hello 👋 Welcome to Elegant Jewellery Store. How may I help you?"

    else:
        reply = "Sorry, that information is not available on this website."

    return JsonResponse({
        "reply": reply
    })

@csrf_exempt
def chatbot(request):

    if request.method != "POST":
        return JsonResponse({
            "reply": "Invalid request."
        })

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    message = data.get("message", "")

    products = search_products(message)

    context = product_context(products)

    reply = ask_ai(
        message,
        context
    )

    return JsonResponse({
        "reply": reply
    })