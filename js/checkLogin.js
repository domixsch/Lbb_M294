async function checkLoggedIn() {
  const response = await fetch("http://localhost:3000/auth/cookie/status", {
    credentials: "include",
  });

  if (response.ok) {
    window.location.href = "/html/index.html";
  } else if (response.status == 401) {
    alert("nicht eingeloggt");
  }
}
