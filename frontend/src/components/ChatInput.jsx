export default function ChatInput({
    value,
    onChange,
    onSend,
    loading
}) {

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {
            onSend();
        }

    };

    return (

        <div className="border-t p-3 flex gap-2">

            <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 outline-none"
                placeholder="Ask about our products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <button
                onClick={onSend}
                disabled={loading}
                className="bg-yellow-600 text-white px-4 rounded-lg"
            >
                {loading ? "..." : "Send"}
            </button>

        </div>

    );
}