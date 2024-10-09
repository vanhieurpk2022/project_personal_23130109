// Function to insert a new row into the table
function addRow() {
  const table = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];

  // Get user input values
  const id = document.querySelector('input[name="ID"]').value;
  const fullName = document.querySelector('input[name="fullName"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const gender = document.querySelector('input[name="gender"]:checked')
    ? document.querySelector('input[name="gender"]:checked').nextSibling
        .nodeValue
    : "";
  const birthday = document.getElementById("birthday").value;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Create a new row
  const newRow = table.insertRow();

  // Insert new cells into the row
  newRow.insertCell(0); // STT
  newRow.insertCell(1).innerText = id;
  newRow.insertCell(2).innerText = fullName;
  newRow.insertCell(3).innerText = phone;
  newRow.insertCell(4).innerText = gender;
  newRow.insertCell(5).innerText = birthday;
  const cell7 = newRow.insertCell(6);
  cell7.appendChild(checkbox);
  // Update the STT column after the new row is added
  updateSTT();
}

// Function to update STT (Số Thứ Tự) for all rows
function updateSTT() {
  const table = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");

  // Loop through each row and update the STT (first column)
  for (let i = 0; i < rows.length; i++) {
    rows[i].getElementsByTagName("td")[0].innerText = i + 1; // Set STT (index starts from 0, so add 1)
  }
}

// Add event listener to the "Add" button
document
  .querySelector('input[name="add"]')
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    addRow(); // Add new row and update STT
  });

// Get references to the search input, table, and button
const searchButton = document.getElementById("find");
const searchInput = document.getElementById("data");
const table = document
  .getElementById("studentTable")
  .getElementsByTagName("tbody")[0];

// Function to search through the table
function searchTable() {
  const filter = searchInput.value.toLowerCase(); // Get the search term and convert to lowercase
  const rows = table.getElementsByTagName("tr"); // Get all rows in the table body

  // Loop through all rows and hide those that don't match the search query
  for (let i = 0; i < rows.length; i++) {
    let found = false;
    const cells = rows[i].getElementsByTagName("td"); // Get all cells in the current row

    // Loop through each cell in the row
    for (let j = 0; j < cells.length; j++) {
      if (cells[j] && cells[j].innerText.toLowerCase().includes(filter)) {
        found = true;
        break; // Stop searching if any cell contains the search term
      }
    }

    // Show the row if a match was found, otherwise hide it
    rows[i].style.display = found ? "" : "none";
  }
}

// Attach the search function to the search button
searchButton.addEventListener("click", function () {
  searchTable();
});

// Get references to the form fields
const studentIDInput = document.querySelector('input[name="ID"]');
const fullNameInput = document.querySelector('input[name="fullName"]');
const phoneInput = document.querySelector('input[name="phone"]');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const birthdayInput = document.getElementById("birthday");

let selectedRow = null; // Store the selected row for editing

// Event listener for table row click (select row for editing)
document.getElementById("studentTable").addEventListener("click", function (e) {
  if (e.target.tagName === "TD") {
    const row = e.target.parentElement; // Get the row that was clicked
    selectedRow = row;

    // Populate form with row data
    studentIDInput.value = row.cells[1].innerText;
    fullNameInput.value = row.cells[2].innerText;
    phoneInput.value = row.cells[3].innerText;
    const gender = row.cells[4].innerText;
    if (gender === "Nam") {
      genderInputs[0].checked = true;
    } else {
      genderInputs[1].checked = true;
    }
    birthdayInput.value = row.cells[5].innerText;

    // Scroll back to form
    window.scrollTo(0, 0);
  }
});

// Function to edit the selected row
document.getElementById("remove").addEventListener("click", function () {
  if (selectedRow) {
    // Update the selected row's cells with the form data
    selectedRow.cells[1].innerText = studentIDInput.value;
    selectedRow.cells[2].innerText = fullNameInput.value;
    selectedRow.cells[3].innerText = phoneInput.value;
    selectedRow.cells[4].innerText = genderInputs[0].checked ? "Nam" : "Nữ";
    selectedRow.cells[5].innerText = birthdayInput.value;

    // Clear the form and reset the selected row
    resetForm();
    selectedRow = null;
  } else {
    alert("Please select a row to edit.");
  }
});

// Function to reset the form fields
function resetForm() {
  studentIDInput.value = "";
  fullNameInput.value = "";
  phoneInput.value = "";
  genderInputs[0].checked = false;
  genderInputs[1].checked = false;
  birthdayInput.value = "";
}

// Optional: Reset form when "Làm Lại" (reset button) is clicked
document
  .querySelector('input[type="reset"]')
  .addEventListener("click", function () {
    selectedRow = null;
  });

document.addEventListener("DOMContentLoaded", function () {
  // Giá trị mặc định
  var defaultRow = {
    stt: 1,
    maSo: "23130109",
    hoTen: "Nguyễn Văn A",
    soDienThoai: "000000000",
    gioiTinh: "Nam",
    ngaySinh: "1999-12-12",
  };

  // Lấy bảng và thêm hàng mới vào phần tbody
  var table = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow();

  // Thêm các ô vào hàng
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);
  var cell7 = newRow.insertCell(6);

  // Tạo checkbox và thêm vào ô ghi chú
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  cell7.appendChild(checkbox);

  // Gán giá trị cho các ô khác
  cell1.innerHTML = defaultRow.stt;
  cell2.innerHTML = defaultRow.maSo;
  cell3.innerHTML = defaultRow.hoTen;
  cell4.innerHTML = defaultRow.soDienThoai;
  cell5.innerHTML = defaultRow.gioiTinh;
  cell6.innerHTML = defaultRow.ngaySinh;
});
// nút xóa
function deleteSelectedRows() {
  var checkboxes = document.querySelectorAll(
    "#studentTable tbody input[type='checkbox']"
  );
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      var row = checkbox.closest("tr");
      row.remove();
    }
  });
}
