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
