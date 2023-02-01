const studentInfoTable = document.getElementById("student-info-table");
const studentImage = document.getElementById("student-image");
const frmSendSms = document.getElementById("frm-send-sms");
const txtPhone = document.getElementById("txt-phone");
const txtTextContent = document.getElementById("txt-text-content");
const btnDelete = document.getElementById("btn-delete");
const tableAbsence = document.getElementById("absence-table");
const lblAbsence = document.getElementById("lbl-nbrAbsence");
const frmAddAbsence = document.getElementById("frm-add-absence");
const txtDateAbsence = document.getElementById("txt-date-absence");
const txtNbrHours = document.getElementById("txt-nbr-hours");

const getUserInfo = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;
  const { data } = await axios.get(`${env.apirurl}/api/students/${id}`);
  showUserInfo(data);
  studentImage.setAttribute("src", data.image);
  txtPhone.value = data.phone;
};

const showTotalNumberOfHours = () => {
  let cpt = 0;
  tableAbsence.querySelectorAll("tbody tr").forEach(row => {
    if (row) {
      cpt += +row.querySelector(".nbrHeures").innerText;
    }
  });
  lblAbsence.innerHTML = cpt;
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

const getAbsences = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;
  const { data } = await axios.get(`${env.apirurl}/api/absences/student/${id}`);
  showAbsences(data);
};

const showAbsences = absences => {
  let html = "";
  absences.forEach(absence => {
    html += `<tr id="${absence._id}">
         <td><small class="">${new Date(
           absence.dateAbsence
         ).toLocaleDateString()}</small></td>
         <td><small class="nbrHeures">${absence.nbrHeures}</small></td>
         <td>
          <button 
            class="btn btn-danger btn-sm" 
            onClick="deleteAbsence('${absence._id}')"
            >
            <i class="fas fa-trash"></i>
            </button>
         </td>
      </tr>`;
  });

  tableAbsence.querySelector("tbody").innerHTML = html;
  showTotalNumberOfHours();
};

const deleteAbsence = async id => {
  Swal.fire({
    title: "Confirmation",
    text: "Do you want delete this absence",
    icon: "question",
    showDenyButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "var(--bs-primary)",
    denyButtonText: `No`,
    denyButtonColor: "var(--bs-danger)",
  }).then(async result => {
    if (result.isConfirmed) {
      axios
        .delete(`${env.apirurl}/api/absences/${id}`)
        .then(() => {
          removeAbsenceRow(id);
          showTotalNumberOfHours();
          Swal.fire({
            title: "Success Message",
            text: "Absence has been deleted successfully ",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "var(--bs-success)",
          });
        })
        .catch(error => {
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
        });
    }
  });
};

const removeAbsenceRow = id => {
  document.getElementById(id).remove();
};

frmSendSms.addEventListener("submit", e => {
  e.preventDefault();
  const phone = txtPhone.value;
  const textContent = txtTextContent.value;
  sendSms(phone, textContent);
});

const sendSms = async (to, text) => {
  try {
    await axios.post(env.apirurl + "/api/sms/" + to, { text });
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

btnDelete.addEventListener("click", e => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;
  if (id) {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want delete this student",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "var(--bs-primary)",
      denyButtonText: `No`,
      denyButtonColor: "var(--bs-danger)",
    }).then(async result => {
      if (result.isConfirmed) {
        axios
          .delete(`${env.apirurl}/api/students/${id}`)
          .then(() => {
            Swal.fire({
              title: "Success Message",
              text: "Student has been deleted successfully ",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "var(--bs-success)",
            });
            setTimeout(() => {
              window.location.href = "./student-list.html";
            }, 1000);
          })
          .catch(error => {
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
          });
      }
    });
  }
});

const addAbsence = async () => {
  try {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const id = params.id;

    await axios.post(`${env.apirurl}/api/absences/student/${id}`, {
      dateAbsence: new Date(txtDateAbsence.value),
      nbrHeures: +txtNbrHours.value,
    });
    txtDateAbsence.value = "";
    txtNbrHours.value = "";
    
    Swal.fire({
      title: "Success Message",
      text: "Absence added successfully ",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--bs-success)",
    });

    getAbsences();
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

frmAddAbsence.addEventListener("submit", async e => {
  e.preventDefault();
  addAbsence();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  } else {
    getUserInfo();
    getAbsences();
  }
});
