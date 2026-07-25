from django.db.models import Q
from .models import Product


KEYWORDS = [
    "ring",
    "rings",
    "necklace",
    "necklaces",
    "earring",
    "earrings",
    "bracelet",
    "bracelets",
    "chain",
    "chains",
    "gold",
    "silver",
    "diamond",
]


def search_products(question):

    question = question.lower()

    queryset = Product.objects.none()

    for word in KEYWORDS:

        if word in question:

            queryset = queryset | Product.objects.filter(
                Q(name__icontains=word) |
                Q(description__icontains=word) |
                Q(category__name__icontains=word)
            )

    if queryset.exists():
        return queryset.distinct()

    return Product.objects.filter(
        Q(name__icontains=question) |
        Q(description__icontains=question) |
        Q(category__name__icontains=question)
    ).distinct()


def product_context(products):

    if not products.exists():
        return "No matching products."

    context = ""

    for product in products:

        context += f"""
Name: {product.name}
Category: {product.category.name}
Price: ${product.price}
Stock: {product.stock}
Description: {product.description}

"""

    return context