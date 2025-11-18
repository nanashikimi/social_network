import {useState} from "react";
import {login} from "../api/auth";
import "./Login.css";
import {Link} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const token = await login(email, password);
        if (token) {
            window.location.href = "/";
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Sign In</button>
                    <p style={{marginTop: "10px", textAlign: "center"}}>
                        No account? <Link to="/signup" style={{color: "#4fa3ff"}}>Sign up</Link>
                    </p>


                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}
