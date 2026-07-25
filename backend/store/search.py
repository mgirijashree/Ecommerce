from .models import Product


def search_products(query):

    return Product.objects.filter(
        name__icontains=query
    )[:5]



def product_context(products):

    text=""

    for product in products:

        text += f"""
Product: {product.name}
Price: ₹{product.price}
Description: {product.description}

"""

    return text