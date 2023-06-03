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

document.addEventListener("DOMContentLoaded", function () {
  // コンテンツの高さを取得
  var contentHeight = document.getElementById("content").offsetHeight;
  console.log("get contentHeight");
  // フッターの位置を調整
  function adjustFooterPosition() {
    var windowHeight = window.innerHeight;
    var footerHeight = document.getElementById("footer").offsetHeight;
    var footer = document.getElementById("footer");
    console.log("get footerHeight");

    if (contentHeight + footerHeight * 3 < windowHeight) {
      footer.style.position = "fixed";
      footer.style.bottom = "0";
    } else {
      footer.style.position = "static";
    }
  }

  // ページ読み込み時とリサイズ時にフッターの位置を調整
  window.addEventListener("load", adjustFooterPosition);
  window.addEventListener("resize", adjustFooterPosition);
});
