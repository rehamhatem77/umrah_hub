import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { LuBot } from "react-icons/lu";

export default function Chatbot() {
    const [showChatbot, setShowChatbot] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [typingResponse, setTypingResponse] = useState("");
const [offers, setOffers] = useState([]);



    const messagesRef = useRef(null);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
        if (!showChatbot && conversation.length === 0) {
            setConversation([
                {
                    role: "assistant",
                    content:
                        "مرحبًا 👋 كيف يمكنني مساعدتك في اختيار باقة العمرة؟",
                },
            ]);
        }
    };

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [conversation, typingResponse]);

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        setConversation((prev) => [
            ...prev,
            { role: "user", content: userMessage },
        ]);

        const currentMessage = userMessage;
        setUserMessage("");
        setIsLoading(true);

        try {
            const res = await axios.post("/chatbot", {
                message: currentMessage,
            });

            const message = res.data?.reply || "No response.";

            animateTyping(message);
        } catch (error) {
            setConversation((prev) => [
                ...prev,
                { role: "assistant", content: "حدث خطأ ما" },
            ]);
        }

        setIsLoading(false);
    };

    const animateTyping = (text) => {
        let index = 0;
        setTypingResponse("");

        const interval = setInterval(() => {
            if (index < text.length) {
                setTypingResponse((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setConversation((prev) => [
                    ...prev,
                    { role: "assistant", content: text },
                ]);
                setTypingResponse("");
            }
        }, 15);
    };

    return (
        <>
           
            <motion.div
                onClick={toggleChatbot}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed bottom-28 right-6 w-16 h-16 bg-app-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-xl z-50"
            >
                <LuBot size={28} />
            </motion.div>

          
            <AnimatePresence>
                {showChatbot && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-48 right-6 w-[320px] h-[450px] 
                        backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 
                        border border-white/20
                        rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                       
                        <div className="bg-app-primary text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 font-semibold">
                                <LuBot />
                                مساعد العمرة
                            </div>
                            <FiX
                                size={20}
                                className="cursor-pointer hover:rotate-90 transition-transform"
                                onClick={toggleChatbot}
                            />
                        </div>

                       
                        <div
                            ref={messagesRef}
                            className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent"
                        >
                            {conversation.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${
                                        msg.role === "user"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                                            msg.role === "user"
                                                ? "bg-app-primary text-white rounded-bl-none"
                                                : "bg-gray-200 dark:bg-gray-700 rounded-br-none"
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {typingResponse && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl text-sm italic rounded-br-none">
                                        {typingResponse}
                                        <span className="animate-pulse ml-1">
                                            |
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                       
                        <div className="p-3 border-t bg-white/60 dark:bg-gray-800/60 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) =>
                                        setUserMessage(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && sendMessage()
                                    }
                                    placeholder="اسأل عن باقات العمرة..."
                                    className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none focus:outline-none focus:ring-0 focus:ring-[var(--app-primary)] focus:border-[var(--app-primary)]"
                                />

                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading}
                                    className={`bg-app-primary text-white p-3 rounded-xl transition ${
                                        isLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:scale-105"
                                    }`}
                                >
                                    <FiSend size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
