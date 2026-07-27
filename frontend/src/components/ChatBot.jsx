import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatButton from "./ChatButton";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { askChatbot } from "../services/chatApi";
import { useCart } from "../context/CartContext";
import api from "../services/api";

const WELCOME_MESSAGE = {
  sender: "bot",
  text:
    "👋 Hi! I'm Aria, your AI shopping assistant. I can help you find products, add items to your cart, or take you to any page on the site — just ask!",
};

const SUGGESTIONS = [
  "Show me diamond rings",
  "Add 2 gold necklaces to cart",
  "Track my order",
  "Tell me about Happy Accessories",
];

export default function ChatBot() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);

  const scrollRef = useRef(null);

  // Load the product catalog once so we can add full product objects
  // (with images etc.) to the cart when the AI resolves an item.
  useEffect(() => {
    api
      .get("products/")
      .then((res) => setCatalog(res.data || []))
      .catch(() => setCatalog([]));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const runAction = (result) => {
    const { action, path, search, items } = result;

    if (action === "navigate" && path) {
      navigate(path);
      return;
    }

    if (action === "show_products") {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      navigate(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
      return;
    }

    if (action === "add_to_cart" && Array.isArray(items) && items.length) {
      const addedNames = [];

      items.forEach((item) => {
        const fullProduct =
          catalog.find((p) => p.id === item.id) ||
          catalog.find(
            (p) => p.name?.toLowerCase() === item.name?.toLowerCase()
          );

        const productToAdd = fullProduct || {
          id: item.id,
          name: item.name,
          price: item.price,
          image: null,
        };

        addToCart(productToAdd, item.quantity || 1);
        addedNames.push(`${item.quantity || 1} × ${productToAdd.name}`);
      });

      if (addedNames.length) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `🛒 Added to cart: ${addedNames.join(", ")}.`,
          },
        ]);
      }
    }
  };

  const sendMessage = async (overrideText) => {
    const text = (overrideText ?? input).trim();

    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await askChatbot(text);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.reply || "Sorry, that content is not available on this website.",
        },
      ]);

      if (res.action && res.action !== "none") {
        runAction(res);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {!open && <ChatButton onClick={() => setOpen(true)} />}

      {open && (
        <div
          className="fixed bottom-6 right-6
                     w-[370px] max-w-[92vw]
                     h-[560px] max-h-[85vh]
                     bg-white
                     rounded-2xl
                     shadow-2xl
                     flex flex-col
                     z-50
                     overflow-hidden"
        >
          <div className="bg-amber-700 text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-bold flex items-center gap-2">
                ✨ Aria — AI Shopping Assistant
              </h2>
              <p className="text-xs text-amber-100">
                Ask, browse, or shop — I can act for you
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-2xl leading-none hover:text-amber-200"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
          >
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}

            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-black px-4 py-3 rounded-xl shadow flex gap-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="flex flex-wrap gap-2 mt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs bg-white border border-amber-200 text-amber-700 px-3 py-2 rounded-full hover:bg-amber-50 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ChatInput
            value={input}
            onChange={setInput}
            onSend={() => sendMessage()}
            loading={loading}
          />
        </div>
      )}
    </>
  );
}
