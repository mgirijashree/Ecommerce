from django.db import models


# ==========================
# Category Model
# ==========================

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


# ==========================
# Product Model
# ==========================


class Product(models.Model):

    name = models.CharField(max_length=200)

    slug = models.SlugField(unique=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name="products"
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    image = models.ImageField(
        upload_to="products/"
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


# ==========================
# Order Model
# ==========================

class Order(models.Model):

    full_name = models.CharField(
        max_length=150
    )

    email = models.EmailField()


    phone = models.CharField(
        max_length=15
    )


    address = models.TextField()


    payment_method = models.CharField(
        max_length=20,
        choices=[
            ("COD", "Cash On Delivery"),
            ("RAZORPAY", "Razorpay")
        ],
        default="COD"
    )


    payment_id = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )


    grand_total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    order_date = models.DateTimeField(
        auto_now_add=True
    )


    STATUS_CHOICES = [

        ("Pending", "Pending"),

        ("Processing", "Processing"),

        ("Shipped", "Shipped"),

        ("Delivered", "Delivered"),

    ]


    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )


    def __str__(self):

        return f"Order #{self.id} - {self.full_name}"


# ==========================
# Order Item Model
# ==========================
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )