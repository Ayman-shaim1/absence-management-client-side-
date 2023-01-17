const studentInfoTable = document.getElementById("student-info-table");
const studentImage = document.getElementById("student-image");

const getUserInfo = async () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const id = params.id;
  const { data } = await axios.get(`${env.apirurl}/api/students/${id}`);
  showUserInfo(data);
  studentImage.setAttribute("src", data.image);
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

getUserInfo();
