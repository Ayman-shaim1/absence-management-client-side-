document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  } else {
    document.getElementById("txt").innerText = "hello " + Auth.user.name + " !";
  }
});
