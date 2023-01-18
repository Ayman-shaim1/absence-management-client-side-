const txtEmail = document.getElementById("txt-email");
const txtPassword = document.getElementById("txt-password");
const formLogin = document.getElementById("form-login");
const messagePanel = document.getElementById("message");

formLogin.addEventListener("submit", e => {
  e.preventDefault();
  login(txtEmail.value, txtPassword.value);
});

const login = async (email, password) => {
  if (email === "") {
    showMessage("please enter your email !");
    return;
  }
  if (password === "") {
    showMessage("please enter your password !");
    return;
  }

  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${env.apirurl}/api/users/login`,
      {
        email,
        password,
      },
      config
    );
    Auth.login(data);
    window.location.href = "./index.html";
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    showMessage(err);
  }
};

const showMessage = message => {
  messagePanel.innerHTML = `<div class="alert alert-danger">${message}</div>`;
};


