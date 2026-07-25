from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .chatbot import build_database_context
from .search import search_products, product_context
from .ai import ask_ai


import json


@csrf_exempt
def register(request):

    if request.method == "POST":

        data = json.loads(request.body)

        user = User.objects.create_user(

            username=data["username"],

            email=data["email"],

            password=data["password"]

        )

        return JsonResponse({

            "message": "Registration Successful"

        })

    return JsonResponse({

        "error": "Invalid Request"

    })



@csrf_exempt
def login_user(request):

    if request.method == "POST":

        data = json.loads(request.body)

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

    data = json.loads(request.body)

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

    data = json.loads(request.body)

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