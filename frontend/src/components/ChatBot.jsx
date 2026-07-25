import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { askChatbot } from "../services/chatApi";

export default function ChatBot() {

    const [open, setOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Welcome to Elegant Jewellery! Ask me anything about our products."
        }
    ]);



    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!input.trim()) return;

        const userMessage = {
            sender: "user",
            text: input
        };

        setMessages(prev => [...prev, userMessage]);

        const currentMessage = input;

        setInput("");

        setLoading(true);

        try {

            const res = await askChatbot(currentMessage);

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: res.reply
                }
            ]);

        } catch (err) {

            setMessages(prev => [
                ...prev,
                {
                    sender: "bot",
                    text: "Server Error."
                }
            ]);

        }

        setLoading(false);
    };

    return (
        <>
            {!open && (
                <ChatButton onClick={() => setOpen(true)} />
            )}

            {open && (
                <div
                    className="fixed bottom-6 right-6
                               w-[370px]
                               h-[550px]
                               bg-white
                               rounded-xl
                               shadow-2xl
                               flex flex-col
                               z-50"
                >
                    <div className="bg-yellow-600 text-white p-4 rounded-t-xl flex justify-between">
                        <div>
                            <h2 className="font-bold">
                                AI Shopping Assistant
                            </h2>

                            <p className="text-sm">
                                Ask about our jewellery
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                message={msg}
                            />
                        ))}
                    </div>

                    <ChatInput
                        value={input}
                        onChange={setInput}
                        onSend={sendMessage}
                        loading={loading}
                    />
                </div>
            )}
        </>
    );
}