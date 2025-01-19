// Khởi tạo mảng students từ localStorage hoặc dữ liệu mẫu
let students = JSON.parse(localStorage.getItem("students")) || [
  {
    mssv: "2310019",
    hoTen: "Nguyễn văn A",
    sdt: "000000000",
    gioiTinh: "Nam",
    ngaySinh: "2000-01-17",
  },
  {
    mssv: "2310020",
    hoTen: "Nguyễn văn B",
    sdt: "88767876",
    gioiTinh: "Nam",
    ngaySinh: "2005-01-17",
  },
];

// Render bảng
function renderTable() {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${student.mssv}</td>
          <td>${student.hoTen}</td>
          <td>${student.sdt}</td>
          <td>${student.gioiTinh}</td>
          <td>${formatDate(student.ngaySinh)}</td>
          <td><input type="checkbox" class="student-checkbox"></td>
      `;
    tbody.appendChild(tr);
  });
  // Lưu vào localStorage sau mỗi lần cập nhật
  localStorage.setItem("students", JSON.stringify(students));
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
}

// Thêm sinh viên mới
function themSinhVien(event) {
  if (event) event.preventDefault(); // Ngăn chặn form submit

  const mssv = document.getElementById("mssv").value;
  const hoTen = document.getElementById("hoTen").value;
  const sdt = document.getElementById("sdt").value;
  const gioiTinh = document.querySelector(
    'input[name="gioiTinh"]:checked'
  ).value;
  const ngaySinh = document.getElementById("ngaySinh").value;

  if (!mssv || !hoTen || !sdt || !ngaySinh) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // Kiểm tra trùng MSSV
  if (students.some((student) => student.mssv === mssv)) {
    alert("Mã số sinh viên đã tồn tại!");
    return;
  }

  students.push({ mssv, hoTen, sdt, gioiTinh, ngaySinh });
  renderTable();
  lamLai();
  return false; // Ngăn chặn form submit
}


// Thêm event listener cho form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit
    themSinhVien();
  });
  renderTable();
});

// Các hàm khác giữ nguyên như cũ
// ... (phần còn lại của code giữ nguyên)

// Reset form
function lamLai() {
  document.getElementById("mssv").value = "";
  document.getElementById("hoTen").value = "";
  document.getElementById("sdt").value = "";
  document.getElementById("ngaySinh").value = "";
  document.querySelector('input[name="gioiTinh"][value="Nam"]').checked = true;
}

// Toggle all checkboxes
function toggleAll(source) {
  const checkboxes = document.getElementsByClassName("student-checkbox");
  for (let checkbox of checkboxes) {
    checkbox.checked = source.checked;
  }
}

// Xóa sinh viên
function xoaSinhVien() {
  const checkboxes = document.getElementsByClassName("student-checkbox");
  const newStudents = [];
  let hasChecked = false;

  students.forEach((student, index) => {
    if (!checkboxes[index].checked) {
      newStudents.push(student);
    } else {
      hasChecked = true;
    }
  });

  if (!hasChecked) {
    alert("Vui lòng chọn ít nhất một sinh viên để xóa!");
    return;
  }

  if (confirm("Bạn có chắc chắn muốn xóa các sinh viên đã chọn?")) {
    students = newStudents;
    document.getElementById("selectAll").checked = false;
    renderTable();
  }
}

// Sửa sinh viên
function suaSinhVien() {
  const checkboxes = document.getElementsByClassName("student-checkbox");
  let selectedCount = 0;
  let selectedIndex = -1;

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedCount++;
      selectedIndex = i;
    }
  }

  if (selectedCount !== 1) {
    alert("Vui lòng chọn một sinh viên để sửa!");
    return;
  }

  const student = students[selectedIndex];
  document.getElementById("mssv").value = student.mssv;
  document.getElementById("hoTen").value = student.hoTen;
  document.getElementById("sdt").value = student.sdt;
  document.querySelector(
    `input[name="gioiTinh"][value="${student.gioiTinh}"]`
  ).checked = true;
  document.getElementById("ngaySinh").value = student.ngaySinh;

  students.splice(selectedIndex, 1);
  renderTable();
}

// Tìm kiếm sinh viên
function searchStudents() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const tbody = document.getElementById("studentTableBody");
  const rows = tbody.getElementsByTagName("tr");

  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    let found = false;

    for (let cell of cells) {
      if (cell.textContent.toLowerCase().includes(searchText)) {
        found = true;
        break;
      }
    }

    row.style.display = found ? "" : "none";
  }
}

// Sắp xếp bảng
function sortTable(columnIndex) {
  const table = document.getElementById("studentTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = Array.from(tbody.getElementsByTagName("tr"));
  const sortIcon = table.getElementsByClassName("sort-icon")[columnIndex];

  // Toggle sort direction
  const isAscending = sortIcon.classList.contains("asc");

  // Reset all sort icons
  document.querySelectorAll(".sort-icon").forEach((icon) => {
    icon.className = "sort-icon";
  });

  // Set new sort icon
  sortIcon.className = "sort-icon " + (isAscending ? "desc" : "asc");

  rows.sort((a, b) => {
    let x = a.getElementsByTagName("td")[columnIndex].textContent;
    let y = b.getElementsByTagName("td")[columnIndex].textContent;

    if (columnIndex === 0) {
      // STT column
      return isAscending
        ? parseInt(y) - parseInt(x)
        : parseInt(x) - parseInt(y);
    }

    return isAscending ? y.localeCompare(x) : x.localeCompare(y);
  });

  rows.forEach((row) => tbody.appendChild(row));
}

// Initialize table when page loads
document.addEventListener("DOMContentLoaded", function () {
  renderTable();
});
