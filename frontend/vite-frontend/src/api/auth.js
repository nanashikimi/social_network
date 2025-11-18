export async function login(email, password) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        return null;
    }

    const data = await res.json();
    const token = data.token;

    if (token) {
        localStorage.setItem("token", token);
        return token;
    }

    return null;
}

export function logout() {
    localStorage.removeItem("token");
}

export async function register(email, password) {
    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        throw new Error("Registration failed");
    }

    return await res.json();
}
