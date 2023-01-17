const studentTable = document.getElementById("student-table");
const paginationList = document.getElementById("pagination");

const getStudent = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let currentPage = params.page || 1;
  const { data } = await axios.get(
    `${env.apirurl}/api/students?page=${currentPage}`
  );
  console.log(data);
  showStudent(data.students);
  showPagination(data.totalPages);
};
getStudent();

const showStudent = data => {
  let html = "";
  data.forEach(student => {
    const filiere = student.filiere.libelle;
    let nbrheures = 0;
    student.absences.forEach(abs => {
      nbrheures += abs.nbrHeures;
    });
    const row = `<tr>
        <td><div class='d-flex justify-content-center'><img src='${student.image}' class="avatar"/></div></td>
        <td><span class="d-block text-center">${student.name}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
        <td><span class="d-block text-center">${filiere}<span></td>
        <td><span class="d-block text-center">${nbrheures}<span></td>
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
};

const showPagination = totalPages => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let currentPage = params.page || 1;
  let previousPage = currentPage !== 1 ? currentPage - 1 : 1;
  let nextPage = currentPage !== totalPages ? currentPage + 1 : totalPages;
  console.log(currentPage);
  console.log(params);
  let html = `<li class="page-item"><a class="page-link" href="./student-list.html?page=${previousPage}">Previous</a></li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${currentPage == i ? "active" : ""}">
    <a class="page-link" href="./student-list.html?page=${i}">${i}</a>
    </li>`;
  }
  html += `<li class="page-item"><a class="page-link" href="./student-list.html?page=${nextPage}">Previous</a></li>`;
  paginationList.innerHTML = html;
};
