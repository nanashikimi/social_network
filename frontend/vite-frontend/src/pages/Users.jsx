import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import { Link } from "react-router-dom";
import "./Users.css";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const currentUserEmail = (() => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            return JSON.parse(atob(token.split(".")[1])).sub;
        } catch {
            return null;
        }
    })();

    useEffect(() => {
        async function load() {
            try {
                const list = await getUsers();
                setUsers(list);
                localStorage.setItem("users_cache", JSON.stringify(list));
            } catch {
                setError("Failed to load users");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) return <div className="users-loading">Loading...</div>;
    if (error) return <div className="users-error">{error}</div>;
    return (
        <div className="users-page">
            <div className="users-container">
                <h1>Users</h1>

                {users.length === 0 && <p>No users found.</p>}

                <ul className="users-list">
                    {users
                        .filter(u => u.email !== currentUserEmail)
                        .map(user => (
                            <li key={user.id} className="users-item">
                                <span>{user.email}</span>

                                <Link
                                    to={`/chat/${user.id}`}
                                    className="users-chat-btn"
                                >
                                    Chat →
                                </Link>
                            </li>
                        ))}
                </ul>

                <Link to="/" className="users-back-btn">← Back</Link>
            </div>
        </div>
    );
}
