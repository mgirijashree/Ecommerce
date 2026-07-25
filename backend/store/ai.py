import os
from groq import Groq

client = None

api_key = os.getenv("GROQ_API_KEY")

if api_key:
    client = Groq(api_key=api_key)

SYSTEM_PROMPT = """
You are the official AI assistant of Elegant Jewellery.

Answer ONLY using the product information provided.

If matching products are available:

• Mention product names.
• Mention prices.
• Mention stock if useful.
• Be polite.

Never invent products.

If there are no matching products:

Say:

"We couldn't find any matching products."

If the question is unrelated to this website:

Reply exactly:

Sorry, that content is not available on this website.
Please ask questions related to our jewellery store.
"""


def ask_ai(question, database_context=""):

    if client is None:
        return "AI service is currently unavailable."

    prompt = f"""
Database Information:

{database_context}

User Question:

{question}
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
        max_tokens=400,
    )

    return completion.choices[0].message.content