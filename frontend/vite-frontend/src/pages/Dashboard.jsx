import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const token = localStorage.getItem("token");

    function decodeToken(token) {
        try {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload));
        } catch {
            return null;
        }
    }

    const decoded = decodeToken(token);
    const email = decoded?.sub || "Unknown";

    return (
        <div className="dashboard-layout">

            {/* L Button*/}
            <div className="dashboard-left">
                <h1>Welcome!</h1>
                <p>Logged in as: <b>{email}</b></p>

                <div className="dashboard-buttons">
                    <Link to="/users" className="dashboard-btn">
                        Go to Users
                    </Link>

                    <button
                        className="dashboard-btn logout-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Landscape(R Button) */}
            <div className="dashboard-right"></div>
        </div>
    );
}
