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
    lineChartTitle.innerText = `${labels[0]} - ${labels[labels.length - 1]}`;
    console.log(labels.length);
    new Chart(lineChart, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Big Data",
            data: [65, 59, 80, 81, 56, 55, 40, 21],
          },
          {
            label: "IAM",
            data: [18, 32, 44, 87, 81, 13, 21, 77],
          },
        ],
      },
      options: {
        aspectRatio: 3,
      },
    });

    new Chart(ctx2, {
      type: "radar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
      },
    });
  }
});
