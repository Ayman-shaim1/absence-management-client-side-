const studentTable = document.getElementById("student-table");
const paginationList = document.getElementById("pagination");
const frmReherche = document.getElementById("frm-recherche");
const drpFiliere = document.getElementById("drp-filiere");
const txtName = document.getElementById("txt-name");

let filiere = "";
let name = "";

const getStudent = async (filiere, name) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let currentPage = params.page || 1;
  const { data } = await axios.get(
    `${env.apirurl}/api/students?page=${currentPage}&filiere=${filiere}&name=${name}`
  );
  console.log(data);
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
      const filiere = student.filiere.libelle;
      let nbrheures = 0;

      const row = `<tr>
        <td><div class='d-flex justify-content-center'><img src='${student.image}' class="avatar"/></div></td>
        <td><span class="d-block text-center">${student.name}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
        <td><span class="d-block text-center">${filiere}<span></td>
        <td><span class="d-block text-center">${student.nbrheuresabsences}<span></td>
        <td>
          <div class="d-flex justify-content-center">
            <a class="btn btn-light btn-sm" href="student-details.html?id=${student._id}">
              <i class="fa-solid fa-calendar-week"></i> details
            </a>
          <div>
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
  drpFiliere.innerHTML += html;
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

frmReherche.addEventListener("click", e => {
  e.preventDefault();
  getStudent(drpFiliere.value, txtName.value);
});
