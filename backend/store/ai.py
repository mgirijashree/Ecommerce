import os
import re
import json

from groq import Groq

from .chatbot import build_site_context, build_database_context, build_products_payload


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL_NAME = "llama-3.3-70b-versatile"

FALLBACK_REPLY = "Sorry, that content is not available on this website."


SYSTEM_PROMPT = """You are "Aria", the AI Shopping Assistant embedded inside the Happy Accessories \
jewellery e-commerce website. You can ONLY talk about things that exist on this website: the pages \
listed below, the products listed below, orders, cart and checkout. You must NEVER answer general \
knowledge questions, coding questions, news, or anything unrelated to this store.

You must reply with STRICT JSON only. No markdown, no code fences, no extra text before or after the \
JSON object. The JSON object must have exactly these keys:

{
  "reply": "<a short, friendly, natural language reply to show the customer>",
  "action": "<one of: none, navigate, show_products, add_to_cart>",
  "path": "<a website path to open, only when action is navigate or show_products, e.g. /shop, /about, /contact, /track-order, /cart>",
  "search": "<a search keyword to use on the shop page, only when action is show_products>",
  "items": [{"name": "<product name as close as possible to the catalog below>", "quantity": <integer>}]
}

Rules:
- If the customer greets you or asks what you can do, action is "none", just reply helpfully about the store.
- If the customer asks to see/open a page (about us, contact, track order, cart, checkout, shop, home), set action to "navigate" and the correct "path".
- If the customer asks about a product, a category, or wants to browse/search something (e.g. "show me rings", "do you have diamond necklaces"), set action to "show_products", path to "/shop", and "search" to the best keyword.
- If the customer asks to add one or more products to the cart (e.g. "add 2 diamond rings to cart", "buy a gold bracelet"), set action to "add_to_cart" and fill "items" with the product name(s) and quantity (default quantity 1 if not mentioned). Match the name as closely as possible to a real product from the catalog below.
- If the question is not about this website at all (general knowledge, weather, coding help, other companies, etc.), set "reply" to exactly "Sorry, that content is not available on this website." and action "none".
- Keep "reply" under 3 sentences.
- Output ONLY the JSON object, nothing else.

Website pages:
{site_context}

Product catalog (id | name | category | price | stock):
{product_context}
"""


def _extract_json(text):
    """Best-effort extraction of a JSON object from the model output."""

    text = text.strip()

    # Strip markdown code fences if the model added them anyway.
    text = re.sub(r"^```(json)?", "", text.strip(), flags=re.IGNORECASE).strip()
    text = re.sub(r"```$", "", text.strip()).strip()

    try:
        return json.loads(text)
    except (json.JSONDecodeError, ValueError):
        pass

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        try:
            return json.loads(match.group(0))
        except (json.JSONDecodeError, ValueError):
            return None

    return None


def _normalise(parsed, products):
    """Validate/clean the parsed JSON, matching item names to real products."""

    if not isinstance(parsed, dict):
        return None

    reply = str(parsed.get("reply") or "").strip() or FALLBACK_REPLY
    action = parsed.get("action") if parsed.get("action") in (
        "none", "navigate", "show_products", "add_to_cart"
    ) else "none"

    result = {
        "reply": reply,
        "action": action,
        "path": parsed.get("path") or None,
        "search": parsed.get("search") or None,
        "items": [],
    }

    if action == "add_to_cart":
        raw_items = parsed.get("items") or []
        matched_items = []

        for raw in raw_items:
            name = str(raw.get("name", "")).strip().lower()

            if not name:
                continue

            try:
                quantity = int(raw.get("quantity", 1))
            except (TypeError, ValueError):
                quantity = 1

            quantity = max(1, quantity)

            best_match = None

            for product in products:
                product_name = product["name"].lower()

                if name == product_name or name in product_name or product_name in name:
                    best_match = product
                    break

            if not best_match:
                # loose word-overlap match as a fallback
                name_words = set(name.split())

                for product in products:
                    product_words = set(product["name"].lower().split())

                    if name_words & product_words:
                        best_match = product
                        break

            if best_match:
                matched_items.append({
                    "id": best_match["id"],
                    "name": best_match["name"],
                    "price": best_match["price"],
                    "quantity": quantity,
                })

        result["items"] = matched_items

        if not matched_items:
            result["action"] = "none"

    return result


def ask_ai(message):

    site_context = build_site_context()
    product_context = build_database_context()
    products = build_products_payload()

    system_prompt = SYSTEM_PROMPT.format(
        site_context=site_context,
        product_context=product_context,
    )

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message},
            ],
            temperature=0.3,
            max_tokens=500,
        )

        raw_text = response.choices[0].message.content

    except Exception:
        return {
            "reply": "Sorry, our AI assistant is temporarily unavailable. Please try again in a moment.",
            "action": "none",
            "path": None,
            "search": None,
            "items": [],
        }

    parsed = _extract_json(raw_text)
    normalised = _normalise(parsed, products)

    if not normalised:
        # Model did not return valid JSON - fall back to a safe, plain reply.
        text = raw_text.strip() if raw_text else FALLBACK_REPLY

        normalised = {
            "reply": text[:500],
            "action": "none",
            "path": None,
            "search": None,
            "items": [],
        }

    return normalised
