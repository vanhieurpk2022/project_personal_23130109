// ===============active
const activePage = window.location.pathname;
console.log(activePage);
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("active");
  }
});
// ================Pop-up Login
document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
  document.querySelector(".screen").style.display = "flex";
});

document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".screen").style.display = "none";
  });

// Labs Tạo biến default
document.addEventListener("DOMContentLoaded", function () {
  // Giá trị mặc định cho hàng
  var defaultLabs2 = {
    stt: 1,
    nameWork: "Bài tập 1: tạo ra checkCode",
    date: "2024-10-10",
    point: 50,
    status: "True",
  };

  // Lấy bảng và thêm hàng mới vào phần tbody
  var table = document
    .getElementById("table_CheckCode_status")
    .getElementsByTagName("tbody")[0];

  var newRow = table.insertRow();

  // Thêm các ô vào hàng
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  // Gán giá trị cho các ô
  cell1.innerHTML = defaultLabs2.stt;
  cell2.innerHTML = defaultLabs2.nameWork;
  cell3.innerHTML = defaultLabs2.date;
  cell4.innerHTML = defaultLabs2.point;
  cell5.innerHTML = defaultLabs2.status;
});
