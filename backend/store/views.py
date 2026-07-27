from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .chatbot import build_database_context
from .search import search_products, product_context
from .ai import ask_ai
from .models import Product, Order, ContactMessage
from django.shortcuts import render
from django.core.mail import send_mail
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

    message = data.get("message", "")

    result = ask_ai(message)

    return JsonResponse(result)


@csrf_exempt
def chatbot(request):

    if request.method != "POST":

        return JsonResponse(
            {"reply":"POST request required"},
            status=405
        )


    try:

        data = json.loads(request.body)

        message = data.get(
            "message",
            ""
        )

        if not message.strip():
            return JsonResponse({
                "reply": "Please type a message so I can help you.",
                "action": "none",
                "path": None,
                "search": None,
                "items": [],
            })

        result = ask_ai(message)

        return JsonResponse(result)

    except Exception as e:

        return JsonResponse(
            {
                "reply": "Sorry, something went wrong on our end. Please try again.",
                "action": "none",
                "path": None,
                "search": None,
                "items": [],
                "error": str(e),
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


@csrf_exempt
def contact_submit(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "POST request required"},
            status=405
        )

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    errors = {}

    if not name:
        errors["name"] = "Name is required"

    if not email:
        errors["email"] = "Email is required"

    if not message:
        errors["message"] = "Message is required"

    if errors:
        return JsonResponse({"errors": errors}, status=400)

    contact = ContactMessage.objects.create(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message,
    )

    email_sent = _send_contact_confirmation_email(contact)
    sms_sent = _send_contact_confirmation_sms(contact)

    contact.email_sent = email_sent
    contact.sms_sent = sms_sent
    contact.save(update_fields=["email_sent", "sms_sent"])

    return JsonResponse({
        "message": "Thank you for reaching out! Our team will get back to you shortly.",
        "email_sent": email_sent,
        "sms_sent": sms_sent,
    })


def _send_contact_confirmation_email(contact):
    """Send a confirmation email to the customer. Fails silently
    (returns False) if email is not configured, so the contact form
    submission never breaks because of a missing SMTP setup."""

    try:
        send_mail(
            subject="We've received your message - Happy Accessories",
            message=(
                f"Hi {contact.name},\n\n"
                "Thank you for contacting Happy Accessories! We've received your "
                "message and our team will get back to you within 24 hours.\n\n"
                f"Your message:\n\"{contact.message}\"\n\n"
                "Warm regards,\nHappy Accessories Team"
            ),
            from_email=getattr(settings, "DEFAULT_FROM_EMAIL", None),
            recipient_list=[contact.email],
            fail_silently=False,
        )
        return True

    except Exception:
        return False


def _send_contact_confirmation_sms(contact):
    """Send a confirmation SMS via Twilio if credentials are configured
    in the environment. If Twilio isn't installed or credentials are
    missing, this simply skips SMS instead of failing the request."""

    if not contact.phone:
        return False

    account_sid = getattr(settings, "TWILIO_ACCOUNT_SID", None)
    auth_token = getattr(settings, "TWILIO_AUTH_TOKEN", None)
    from_number = getattr(settings, "TWILIO_FROM_NUMBER", None)

    if not (account_sid and auth_token and from_number):
        return False

    try:
        from twilio.rest import Client

        client = Client(account_sid, auth_token)

        client.messages.create(
            body=(
                f"Hi {contact.name}, thanks for contacting Happy Accessories! "
                "Our team will get back to you shortly."
            ),
            from_=from_number,
            to=contact.phone,
        )

        return True

    except Exception:
        return False
