from django.contrib import admin

from .models import (
    Category,
    Product,
    Order,
    OrderItem
)


# ==========================
# Category Admin
# ==========================

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "slug"
    )

    prepopulated_fields = {
        "slug": ("name",)
    }



# ==========================
# Product Admin
# ==========================

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "category",
        "price",
        "stock",
        "available"
    )

    list_filter = (
        "category",
        "available"
    )

    search_fields = (
        "name",
    )



# ==========================
# Order Item Inline
# ==========================

class OrderItemInline(admin.TabularInline):

    model = OrderItem

    extra = 0

    readonly_fields = (
        "price",
    )

