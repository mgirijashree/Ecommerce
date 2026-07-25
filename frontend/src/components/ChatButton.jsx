import { MessageCircle } from "lucide-react";

export default function ChatButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50
                       w-16 h-16 rounded-full
                       bg-yellow-600
                       hover:bg-yellow-700
                       text-white
                       shadow-2xl
                       flex items-center justify-center
                       transition duration-300"
        >
            <MessageCircle size={30} />
        </button>
    );
}