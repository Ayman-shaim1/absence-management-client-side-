const studentTable = document.getElementById("student-table");

const tableloading = `
<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>
<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>
<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>
<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>

<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>
<tr>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-12"></span>
  </div>
</td>
<td>
  <div class="d-flex justify-content-center">
    <span class="placeholder col-4"></span>
  </div>
</td>
</tr>
`;

const getStudent = async () => {
  const { data } = await axios.get(`${env.apirurl}/api/students?page=10`);
  showStudent(data.students);
};
getStudent();

const showStudent = data => {
  let html = "";
  data.forEach(student => {
    const row = `<tr>
        <td><div class='d-flex justify-content-center'><img src='${student.image}'/>    </div></td>
        <td><span class="d-block text-center">${student.name}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
        <td><span class="d-block text-center">${student.phone}<span></td>
    </tr>`;
    html += row;
  });

  studentTable.querySelector("tbody").innerHTML = html;
};
