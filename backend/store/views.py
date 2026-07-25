from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .chatbot import build_database_context
from .search import search_products, product_context
from .ai import ask_ai
from .models import Product, Order
from django.shortcuts import render
from rest_framework.response import Response
from .serializers import ProductSerializer, OrderSerializer
import razorpay
from django.conf import settings

from django.db.models import Sum, Count
from rest_framework.decorators import api_view


from rest_framework import generics
import json

from rest_framework.views import APIView

from rest_framework.permissions import IsAdminUser


def home_view(request):
    return render(request, 'store/home.html')

@api_view(["GET"])
def product_list(request):

    products = Product.objects.filter(
        available=True
    )

    serializer = ProductSerializer(
        products,
        many=True,
        context={"request": request}
    )

    return Response(serializer.data)


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

        return JsonResponse(
            {"reply":"POST request required"},
            status=405
        )


    try:

        data=json.loads(request.body)

        message=data.get(
            "message",
            ""
        )


        products = search_products(
            message
        )


        context = product_context(
            products
        )


        reply = ask_ai(
            message,
            context
        )


        return JsonResponse(
            {
                "reply":reply
            }
        )


    except Exception as e:

        return JsonResponse(
            {
                "error":str(e)
            },
            status=500
        )



class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(["POST"])
def create_order(request):

    serializer = OrderSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message":"Order placed successfully"
            },
            status=201
        )


    return Response(
        serializer.errors,
        status=400
    )




class OrderCreateView(
    generics.CreateAPIView
):

    queryset = Order.objects.all()

    serializer_class = OrderSerializer



@api_view(["POST"])
def create_payment(request):

    amount = request.data.get("amount")


    client = razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET
        )
    )


    payment_order = client.order.create(
        {

            "amount": int(amount * 100),  # paise

            "currency":"INR",

            "payment_capture":1

        }
    )


    return Response(
        {
            "id": payment_order["id"],
            "amount": payment_order["amount"],
            "currency":"INR",

            "key":
            settings.RAZORPAY_KEY_ID

        }
    )





class UpdateOrderStatusView(APIView):


    def patch(self, request, pk):

        order = Order.objects.get(
            id=pk
        )


        status = request.data.get(
            "status"
        )


        order.status = status

        order.save()


        return Response({

            "message":
            "Status updated successfully"

        })




@api_view(["GET"])
def track_order(request, pk):

    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=404
        )

    return Response({
        "id": order.id,
        "customer": order.full_name,
        "status": order.status,
        "payment": order.payment_method,
        "total": order.grand_total,
        "date": order.order_date,
    })


@api_view(["GET"])
def track_order(request, pk):

    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=404
        )

    return Response({

        "id": order.id,

        "customer": order.full_name,

        "payment": order.payment_method,

        "status": order.status,

        "total": order.grand_total,

        "date": order.order_date,

        "items": [

            {
                "product": item.product.name,
                "image": request.build_absolute_uri(
                    item.product.image.url
                ),
                "price": item.price,
                "quantity": item.quantity,
            }

            for item in order.items.all()

        ]

    })



@api_view(["GET"])
def order_list(request):

    orders = Order.objects.all().order_by("-order_date")

    data = []

    for order in orders:

        data.append({

            "id": order.id,

            "customer": order.full_name,

            "total": order.grand_total,

            "status": order.status,

            "payment": order.payment_method,

            "date": order.order_date,

        })

    return Response(data)

