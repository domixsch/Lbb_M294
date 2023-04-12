async function tryLogin() {
    debugger;
    const email = document.getElementById("email_input").value;
    const password = document.getElementById("password_input").value;
    // Regex-Test für E-Mail-Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email address.");
        return;
    }
    const response = await fetch("http://localhost:3000/auth/cookie/login", {
        credentials: "include",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    checkLoggedIn();
}

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    return false;
});

checkLoggedIn();