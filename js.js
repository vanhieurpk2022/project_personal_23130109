// Lấy các trường input từ form
let fullName = document.querySelector('input[name="fullName"]');
let getID = document.querySelector('input[name="ID"]');
let phone = document.querySelector('input[name="phone"]');
let genderInputs = document.querySelectorAll('input[name="gender"]');
let birthday = document.querySelector('input[id="birthday"]');

// Khi người dùng nhấn nút "Thêm"
document
  .querySelector('input[name="add"]')
  .addEventListener("click", function (event) {
    // Ngăn chặn hành vi mặc định của form (tránh load lại trang)
    event.preventDefault();

    // Lấy bảng theo id
    var table = document
      .getElementById("studentTable")
      .getElementsByTagName("tbody")[0];

    // Tạo một hàng mới
    var newRow = table.insertRow();

    // Tạo và chèn các ô vào hàng
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Lấy giới tính được chọn
    let gender = "";
    for (let i = 0; i < genderInputs.length; i++) {
      if (genderInputs[i].checked) {
        gender = genderInputs[i].nextSibling.textContent.trim();
      }
    }

    // Thêm nội dung vào các ô từ giá trị của input
    cell1.innerHTML = getID.value;
    cell2.innerHTML = fullName.value;
    cell3.innerHTML = phone.value;
    cell4.innerHTML = gender;
    cell5.innerHTML = birthday.value;

    // Hiển thị thông báo thêm thành công
    alert("Đã thêm Thành Công");

    // Xóa dữ liệu sau khi thêm
    getID.value = "";
    fullName.value = "";
    phone.value = "";
    birthday.value = "";
    for (let i = 0; i < genderInputs.length; i++) {
      genderInputs[i].checked = false;
    }
  });
