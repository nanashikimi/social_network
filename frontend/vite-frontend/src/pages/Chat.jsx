import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChat, sendMessage } from "../api/messages";

export default function Chat() {
    const { id } = useParams();
    const otherUserId = Number(id);

    const token = localStorage.getItem("token");
    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const currentUserEmail = payload?.sub;

    const currentUserId = (() => {
        const users = JSON.parse(localStorage.getItem("users_cache") || "[]");
        const me = users.find(u => u.email === currentUserEmail);
        return me?.id || null;
    })();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        loadChat();
        const interval = setInterval(loadChat, 1500);
        return () => clearInterval(interval);
    }, []);

    async function loadChat() {
        if (!currentUserId) return;
        const data = await getChat(currentUserId, otherUserId);
        setMessages(data);
    }

    async function handleSend(e) {
        e.preventDefault();
        if (!text.trim()) return;

        await sendMessage(currentUserId, otherUserId, text.trim());
        setText("");
        loadChat();
    }

    return (
        <div style={{
            background: "#1f1f1f",
            color: "white",
            height: "100vh",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{ width: "600px" }}>

                <Link to="/users" style={{ color: "#4fa3ff" }}>
                    ← Back
                </Link>

                <h2 style={{ textAlign: "center" }}>
                    Chat with User #{otherUserId}
                </h2>

                <div style={{
                    background: "#242424",
                    height: "70vh",
                    overflowY: "auto",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "15px"
                }}>
                    {messages.map(m => (
                        <div key={m.id}
                             style={{
                                 display: "flex",
                                 justifyContent: m.sender.id === currentUserId ? "flex-end" : "flex-start",
                                 marginBottom: "10px"
                             }}>
                            <div style={{
                                background: m.sender.id === currentUserId ? "#4fa3ff" : "#333",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                maxWidth: "60%"
                            }}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSend}
                      style={{ display: "flex", gap: "10px" }}>

                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                        style={{
                            flex: 1,
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #333",
                            background: "#222",
                            color: "white"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: "12px 20px",
                            background: "#4fa3ff",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
