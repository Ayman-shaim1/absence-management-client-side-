document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  }
});
