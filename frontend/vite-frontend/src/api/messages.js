export async function sendMessage(senderId, receiverId, content) {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/messages/send", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ senderId, receiverId, content })
    });

    if (res.status === 401) {
        alert("Your session is expired! Please Logout and Login again to use full instrumental of Social.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    if (!res.ok) throw new Error("Failed to send message");

    return await res.json();
}

export async function getChat(user1Id, user2Id) {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `http://localhost:8080/api/messages/${user1Id}/${user2Id}`,
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    );

    if (res.status === 401) {
        alert("Your session is expired! Please Logout and Login again to continue.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return [];
    }

    if (!res.ok) throw new Error("Failed to load chat");

    return await res.json();
}

