from django.db import models


class Category(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=200)

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    image = models.ImageField(
        upload_to="products/"
    )

    stock = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):

    full_name = models.CharField(max_length=150)

    email = models.EmailField()

    address = models.TextField()

    grand_total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    order_date = models.DateTimeField(auto_now_add=True)

    STATUS = [

        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),

    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Pending"
    )

    def __str__(self):
        return f"Order #{self.id}"


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

    quantity = models.PositiveIntegerField(default=1)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.product.name