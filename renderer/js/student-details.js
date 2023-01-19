const studentInfoTable = document.getElementById("student-info-table");
const studentImage = document.getElementById("student-image");
const frmSendSms = document.getElementById("frm-send-sms");
const txtPhone = document.getElementById("txt-phone");
const txtTextContent = document.getElementById("txt-text-content");

const getUserInfo = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;
  const { data } = await axios.get(`${env.apirurl}/api/students/${id}`);
  showUserInfo(data);
  studentImage.setAttribute("src", data.image);
  txtPhone.value = data.phone;
};

const showUserInfo = studentinfo => {
  const filiere = studentinfo.filiere.libelle;
  let html = `<tr>
                <td><small class="d-block text-center">name</small></td>
                <td><small class="d-block text-center">${studentinfo.name}</small></td>
                </tr>
                <tr>
                <td><small class="d-block text-center">phone</small></td>
                <td>
                    <small class="d-block text-center">${studentinfo.phone}</small>
                </td>
                </tr>
                <tr>
                <td><small class="d-block text-center">filiere</small></td>
                <td><small class="d-block text-center">${filiere}</small></td>
    </tr>`;

  studentInfoTable.querySelector("tbody").innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  } else {
    getUserInfo();
  }
});

frmSendSms.addEventListener("submit", e => {
  e.preventDefault();
  const phone = txtPhone.value;
  const textContent = txtTextContent.value;
  sendSms(phone, textContent);
});

const sendSms = async (to, text) => {
  try {
    const { data } = await axios.post(env.apirurl + "/api/sms/" + to, { text });
    Swal.fire({
      title: "Validation",
      text: "SMS sent successfully",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--bs-success)",
    });
    txtPhone.value = "";
    txtTextContent.value = "";
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    Swal.fire({
      title: "Error !",
      text: err,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--bs-danger)",
    });
  }
};
