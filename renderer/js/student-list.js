const studentTable = document.getElementById("student-table");
const paginationList = document.getElementById("pagination");
const frmReherche = document.getElementById("frm-recherche");
const drpFiliereList = document.getElementById("drp-filiere-list");
const txtName = document.getElementById("txt-name");

const frmAddStudent = document.getElementById("frm-add-student");
const drpFiliereAdd = document.getElementById("drp-filiere-add");
const txtPhone = document.getElementById("txt-phone");
const txtNameAdd = document.getElementById("txt-name-add");
const imagepicker = document.getElementById("image-picker");

let filiere = "";
let name = "";

const getStudent = async (filiere, name) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let currentPage = params.page || 1;
  const { data } = await axios.get(
    `${env.apirurl}/api/students?page=${currentPage}&filiere=${filiere}&name=${name}`
  );
  showStudent(data.students);
  showPagination(data.totalPages);
};

const getFilieres = async () => {
  const { data } = await axios.get(`${env.apirurl}/api/filieres`);
  console.log(data);
  showFiliers(data);
};

const showStudent = data => {
  let html = "";
  if (data.length !== 0) {
    data.forEach(student => {
      const filiere = student.filiere ? student.filiere.libelle : "";
      let nbrheures = 0;
      const row = `<tr id="${student._id}">
        <td><div class='d-flex justify-content-center'><img src='${student.image}' class="avatar"/></div></td>
        <td><span class="d-block text-center">${student.name}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
        <td><span class="d-block text-center">${filiere}<span></td>
        <td><span class="d-block text-center">${student.nbrheuresabsences}<span></td>
        <td>
           <div class="btn-group">
              <a class="btn btn-light btn-sm" href="student-details.html?id=${student._id}">
                <i class="fa-solid fa-calendar-week"></i>
              </a>
              <button 
                class="btn btn-danger btn-sm" 
                onClick="deleteStudent('${student._id}')">
                <i class="fas fa-trash"></i>
            </button>
           </div>
        </td>
    </tr>`;
      html += row;
    });

    studentTable.querySelector("tbody").innerHTML = html;
  } else {
    studentTable.querySelector("tbody").innerHTML =
      "<tr><td colspan='7'><div class='alert alert-info'><i class='fas fa-exclamation-circle'></i>  nothing is found</div></td></tr>";
  }
};

const showFiliers = data => {
  let html = "";
  data.forEach(filiere => {
    html += `<option value="${filiere._id}">${filiere.libelle}</option>`;
  });
  drpFiliereList.innerHTML += html;
  drpFiliereAdd.innerHTML += html;
};

const showPagination = totalPages => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let currentPage = params.page || 1;
  let previousPage = currentPage - 1;
  let nextPage = currentPage + 1;

  console.log(currentPage);
  console.log(params);
  let html =
    currentPage > 1
      ? `<li class="page-item"><a class="page-link" href="./student-list.html?page=${previousPage}">Previous</a></li>`
      : "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${currentPage == i ? "active" : ""}">
    <a class="page-link" href="./student-list.html?page=${i}">${i}</a>
    </li>`;
  }
  html +=
    currentPage < totalPages
      ? `<li class="page-item"><a class="page-link" href="./student-list.html?page=${nextPage}">Next</a></li>`
      : "";
  paginationList.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  } else {
    getStudent(filiere, name);
    getFilieres();
  }
});

frmReherche.addEventListener("submit", e => {
  e.preventDefault();
  getStudent(drpFiliereList.value, txtName.value);
});

frmAddStudent.addEventListener("submit", async e => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("phone", txtPhone.value);
    formData.append("name", txtNameAdd.value);
    formData.append("filiere", drpFiliereAdd.value);
    const file = imagepicker.files[0];
    formData.append("file", file);

    await axios.post(`${env.apirurl}/api/students/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    txtPhone.value = "";
    txtNameAdd.value = "";
    drpFiliereAdd.value = "";
    imagepicker.value = "";

    Swal.fire({
      title: "Success Message",
      text: "Student has been added successfully ",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--bs-success)",
    });
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
});

const deleteStudent = async id => {
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
          removeStudentRow(id);
          Swal.fire({
            title: "Success Message",
            text: "Student has been deleted successfully ",
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

const removeStudentRow = id => {
  document.getElementById(id).remove();
};
