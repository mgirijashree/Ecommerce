from django.contrib import admin

from .models import (
    Category,
    Product,
    Order,
    OrderItem
)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
    )

    search_fields = (
        "name",
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock",
        "created_at",
    )

    list_filter = (
        "category",
    )

    search_fields = (
        "name",
    )


class OrderItemInline(admin.TabularInline):

    model = OrderItem

    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "full_name",
        "email",
        "grand_total",
        "status",
        "order_date",
    )

    search_fields = (
        "full_name",
        "email",
    )

    list_filter = (
        "status",
    )

    inlines = [
        OrderItemInline
    ]