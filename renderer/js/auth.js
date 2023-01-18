class Auth {
  static login = userInfo => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };
  static logout = () => {
    localStorage.removeItem("userInfo");
  };

  static get user() {
    const user = localStorage.getItem("userInfo");
    return JSON.parse(user);
  }

  static get islogin() {
    const checkuser = localStorage.getItem("userInfo");
    if (checkuser) return true;
    else return false;
  }
}
