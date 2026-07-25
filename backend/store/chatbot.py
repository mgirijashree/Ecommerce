from .models import Product


def build_database_context():

    products = Product.objects.select_related("category").all()

    if not products.exists():
        return "No products available."

    context = ""

    for product in products:

        context += f"""
Product:
Name: {product.name}
Category: {product.category.name}
Price: {product.price}
Stock: {product.stock}
Description: {product.description}
"""

    return context