function toggleMenu() {
  var menuItems = document.getElementById("menu-items");
  if (menuItems.style.display === "none") {
    menuItems.style.display = "block"; // メニューを表示
  } else {
    menuItems.style.display = "none"; // メニューを非表示
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const focusInput = "<%= focusInput %>";

  if (focusInput) {
    const inputElement = document.getElementById("password");
    inputElement.focus();
  }
});
