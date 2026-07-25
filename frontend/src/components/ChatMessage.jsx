export default function ChatMessage({ message }) {
    const isBot = message.sender === "bot";

    return (
        <div
            className={`flex mb-3 ${
                isBot ? "justify-start" : "justify-end"
            }`}
        >
            <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow

                ${
                    isBot
                        ? "bg-gray-200 text-black"
                        : "bg-yellow-600 text-white"
                }
                `}
            >
                {message.text}
            </div>
        </div>
    );
}