from .models import Product


# ==========================================================
# Site map: describes every page the AI Assistant is allowed
# to know about / navigate the user to. Keep this in sync
# with frontend/src/App.jsx routes.
# ==========================================================

SITE_PAGES = [
    {"name": "Home", "path": "/", "description": "Landing page with hero banner, categories and featured products."},
    {"name": "Shop", "path": "/shop", "description": "Full product catalog with search and category filters."},
    {"name": "Product Details", "path": "/product/:id", "description": "Details of a single product."},
    {"name": "Cart", "path": "/cart", "description": "Shopping cart with items added by the customer."},
    {"name": "Checkout", "path": "/checkout", "description": "Checkout page to place an order and pay."},
    {"name": "About Us", "path": "/about", "description": "Information about the Happy Accessories brand, story, and values."},
    {"name": "Contact Us", "path": "/contact", "description": "Contact form to reach the support team, with email & SMS confirmation."},
    {"name": "Track Order", "path": "/track-order", "description": "Page to enter an Order ID and track order status."},
    {"name": "My Orders", "path": "/orders", "description": "List of the customer's past orders."},
]


def build_site_context():
    """Human readable description of every page on the website."""

    lines = []

    for page in SITE_PAGES:
        lines.append(f"- {page['name']} ({page['path']}): {page['description']}")

    return "\n".join(lines)


def build_database_context(limit=60):
    """Human readable description of the product catalog."""

    products = Product.objects.select_related("category").filter(available=True)[:limit]

    if not products:
        return "No products available."

    context = ""

    for product in products:
        category_name = product.category.name if product.category else "Uncategorised"

        context += (
            f"- id:{product.id} | name:{product.name} | category:{category_name} "
            f"| price:{product.price} | stock:{product.stock}\n"
        )

    return context


def build_products_payload(limit=200):
    """Machine readable list of products the AI can reference when it
    needs to match a name the customer typed to an actual product id."""

    products = Product.objects.select_related("category").filter(available=True)[:limit]

    return [
        {
            "id": product.id,
            "name": product.name,
            "category": product.category.name if product.category else "",
            "price": str(product.price),
            "stock": product.stock,
        }
        for product in products
    ]
