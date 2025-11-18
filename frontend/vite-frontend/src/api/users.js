export async function getUsers() {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/auth/users", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
}
