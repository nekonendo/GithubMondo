window.onload = function () {
  var category = document.getElementById("category");
  var tangen = document.getElementById("tangen");

  const ifCategory = function () {
    if (category.value == "newhorizon1") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="1U0">Unit0</option>
      <option value="1U1">Unit1</option>
      <option value="1U2">Unit2</option>
      <option value="1U3">Unit3</option>
      <option value="1U4">Unit4</option>
      <option value="1U5">Unit5</option>
      <option value="1U6">Unit6</option>
      <option value="1U7">Unit7</option>
      <option value="1U8">Unit8</option>
      <option value="1U9">Unit9</option>
      <option value="1U10">Unit10</option>
        `;
    } else if (category.value == "newhorizon2") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="2U0">Unit0</option>
      <option value="2U1">Unit1</option>
      <option value="2U2">Unit2</option>
      <option value="2U3">Unit3</option>
      <option value="2U4">Unit4</option>
      <option value="2U5">Unit5</option>
      <option value="2U6">Unit6</option>
      <option value="2U7">Unit7</option>
      `;
    } else if (category.value == "newhorizon3") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="3U0">Unit0</option>
      <option value="3U1">Unit1</option>
      <option value="3U2">Unit2</option>
      <option value="3U3">Unit3</option>
      <option value="3U4">Unit4</option>
      <option value="3U5">Unit5</option>
      <option value="3U6">Unit6</option>
      `;
    } else if (category.value == "newcrown1") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="1L0pre">Lesson0-pre</option>
      <option value="1L0pre2">Lesson0-pre2</option>
      <option value="1L0pre3">Lesson0-pre3</option>
      <option value="1L1">Lesson1</option>
      <option value="1L2">Lesson2</option>
      <option value="1L3">Lesson3</option>
      <option value="1L4">Lesson4</option>
      <option value="1L5">Lesson5</option>
      <option value="1L6">Lesson6</option>
      <option value="1L7">Lesson7</option>
      <option value="1L8">Lesson8</option>           
      `;
    } else if (category.value == "newcrown2") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="2L0">Lesson0</option>
      <option value="2L1">Lesson1</option>
      <option value="2L1GET">Lesson1-GET</option>
      <option value="2L1READ">Lesson1-READ</option>
      <option value="2L1TAKE">Lesson1-TAKE</option>
      <option value="2L2">Lesson2</option>
      <option value="2L2GET">Lesson2-GET</option>
      <option value="2L2PROJECT">Lesson2-PROJECT</option>
      <option value="2L2READ">Lesson2-READ</option>
      <option value="2L2TAKE">Lesson2-TAKE</option>
      <option value="2L3">Lesson3</option>
      <option value="2L3READ">Lesson3-GET</option>
      <option value="2L3GET">Lesson3-READ</option>
      <option value="2L3SPEAK">Lesson3-SPEAK</option>
      <option value="2L4">Lesson4</option>
      <option value="2L4GET">Lesson4-GET</option>
      <option value="2L4READING">Lesson4-READING</option>
      <option value="2L4TAKE">Lesson4-TAKE</option>
      <option value="2L4Write">Lesson4-WRITE</option>
      <option value="2L5">Lesson5</option>
      <option value="2L5GET">Lesson5-GET</option>
      <option value="2L5PROJECT">Lesson5-PROJECT</option>
      <option value="2L5TAKE">Lesson5-TAKE</option>
      <option value="2L5WRITE">Lesson5-WRITE</option>      
      <option value="2L6">Lesson6</option>
      <option value="2L6GET">Lesson6-GET</option>
      <option value="2L6TAKE">Lesson6-TAKE</option>
      <option value="2L6WRITE">Lesson6-WRITE</option>
      <option value="2L7">Lesson7</option>
      <option value="2L7PROJECT">Lesson7-PROJECT</option>
      <option value="2L7READ">Lesson7-READ</option>
      <option value="2L7READING">Lesson7-READING</option>
      <option value="2L7SPEAK">Lesson7-SPEAK</option>
      <option value="2L7TAKE">Lesson7-TAKE</option>
        `;
    } else if (category.value == "newcrown3") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="3L0Starter">Lesson0-Starter</option>
      <option value="3L1">Lesson1</option>
      <option value="3L1Speak">Lesson1-SPEAK</option>
      <option value="3L1Take">Lesson1-TAKE</option>
      <option value="3L2">Lesson2</option>
      <option value="3L2Project">Lesson2-PROJECT</option>
      <option value="3L2Take">Lesson2-TAKE</option>
      <option value="3L2Write">Lesson2-WRITE</option>
      <option value="3L3">Lesson3</option>
      <option value="3L3Get">Lesson3-GET</option>
      <option value="3L3Take">Lesson3-TAKE</option>
      <option value="3L3Write">Lesson3-WRITE</option>
      <option value="3L4">Lesson4</option>
      <option value="3L4Reading">Lesson4-READING</option>
      <option value="3L4Take">Lesson4-TAKE</option>
      <option value="3L5">Lesson5</option>
      <option value="3L5Project">Lesson5-PROJECT</option>
      <option value="3L5Take">Lesson5-TAKE</option>
      <option value="3L5Write">Lesson5-WRITE</option>
      <option value="3L6">Lesson6</option>
      <option value="3L6Get">Lesson6-GET</option>
      <option value="3L6Take">Lesson6-TAKE</option>
      <option value="3L6Write">Lesson6-WRITE</option>
      <option value="3L7">Lesson7</option>
      <option value="3L7Get">Lesson7-GET</option>
      <option value="3L7Project">Lesson7-PROJECT</option>
      <option value="3L7Reading">Lesson7-READING</option>
      <option value="3L7Reading3">Lesson7-READING3</option>
      <option value="3L7Speak">Lesson7-SPEAK</option>      
      `;
    } else {
      tangen.innerHTML = "<option value='1'>選択してください</option>";
    }
  };
  //ドロップダウンをチェンジした時にリストを呼び出してhtmlを動的に変更
  category.addEventListener("change", function () {
    ifCategory();
  });

  // 単元プルダウンの処理
  ifCategory();
  let selectedValue2 = localStorage.getItem("selectedValue2");
  if (selectedValue2 === null || selectedValue2 === undefined) {
    document.getElementById("tangen").value = "";
  } else {
    document.getElementById("tangen").value = selectedValue2;
  }
  document.getElementById("tangen").addEventListener("change", function () {
    selectedValue2 = document.getElementById("tangen").value;
    localStorage.setItem("selectedValue2", selectedValue2);
  });
};
function toggleMenu() {
  var menuItems = document.getElementById("menu-items");
  if (menuItems.style.display === "none") {
    menuItems.style.display = "block"; // メニューを表示
  } else {
    menuItems.style.display = "none"; // メニューを非表示
  }
}
