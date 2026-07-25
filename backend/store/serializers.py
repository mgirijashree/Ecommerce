from rest_framework import serializers
from .models import Product, Category, Order, OrderItem

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class ProductSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "category",
            "description",
            "price",
            "image",
            "stock",
            "available"
        ]



class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:

        model = OrderItem

        fields = [
            "product",
            "quantity",
            "price"
        ]




class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True
    )


    class Meta:

        model = Order

        fields = [

            "id",

            "full_name",

            "email",

            "phone",

            "address",

            "payment_method",

            "payment_id",

            "grand_total",

            "status",

            "order_date",

            "items"

        ]


    def create(self, validated_data):

        items_data = validated_data.pop(
            "items"
        )


        order = Order.objects.create(
            **validated_data
        )


        for item in items_data:

            OrderItem.objects.create(

                order=order,

                product=item["product"],

                quantity=item["quantity"],

                price=item["price"]

            )


        return order


    