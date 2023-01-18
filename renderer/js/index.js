const navbarUsernameLink = document.getElementById("navbar-username-link");
const logoutLink = document.getElementById("logout-link");
const env = {
  apirurl: "http://localhost:5000",
};

document.addEventListener("DOMContentLoaded", () => {
  console.log(navbarUsernameLink);
  if (Auth.islogin) {
    navbarUsernameLink.innerText = "hello " + Auth.user.name + " !";
  }
});

logoutLink.addEventListener("click", e => {
  e.preventDefault();
  Auth.logout();
  window.location.href = "./login.html";
});
