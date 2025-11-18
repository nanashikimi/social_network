import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";
import "./Signup.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await register(email, password);
            setSuccess("Account created! You can now log in.");
        } catch (err) {
            setError("Failed to create account");
        }
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1>Sign Up</h1>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit">Create Account</button>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "lightgreen" }}>{success}</p>}
                </form>

                <p className="signup-login-link">
                    Already have an account in Social? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
