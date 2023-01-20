const lineChart = document.getElementById("line-chart");
const lineChartTitle = document.getElementById("line-chart-title");
const ctx2 = document.getElementById("chart2");

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate).toLocaleDateString());
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.islogin) {
    window.location.href = "./login.html";
  } else {
    const labels = getDates(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      new Date()
    );
    getResChart(labels[0], labels[labels.length - 1])
      .then(res => {
        lineChartTitle.innerText = `${labels[0]} - ${
          labels[labels.length - 1]
        }`;

        new Chart(lineChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Big Data",
                data: res.data.BigData,
              },
              {
                label: "IAM",
                data: res.data.IAM,
              },
            ],
          },
          options: {
            aspectRatio: 3,
          },
        });
      })
      .catch(error => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(err);
      });
  }
});

const getResChart = async (date1, date2) => {
  return await axios.get(
    `${env.apirurl}/api/dashboard/filieres/nbrheures?date1=${date1}&date2=${date2}`
  );
};
