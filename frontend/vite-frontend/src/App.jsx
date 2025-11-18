import { Navigate } from "react-router-dom";

export default function App() {
    const token = localStorage.getItem("token");
    // No token - u should go an Login
    if (!token) {
        return <Navigate to="/login" />;
    }
    // Have a token - Dashboard cz Logged in
    return <Navigate to="/dashboard" />;
}
