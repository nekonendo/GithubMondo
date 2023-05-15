window.onload = function () {
  var subject = document.getElementById("subject");
  var category = document.getElementById("category");
  var tangen = document.getElementById("tangen");
  var addsubject = document.getElementById("addsubject");
  var addcategory = document.getElementById("addcategory");
  var addtangen = document.getElementById("addtangen");
  var hiddenCategory = document.getElementById("hiddenCategory");
  const checkboxes = document.querySelectorAll(".checkbox");
  const allCheckbox = document.querySelector("#allCheckbox");
  //チェックボックスの全選択・全解除
  allCheckbox.addEventListener("change", () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = allCheckbox.checked;
    });
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
      allCheckbox.checked = allChecked;
    });
  });
  //ドロップダウンの選択肢リスト
  const ifSubject = function () {
    if (subject.value == "math") {
      //数学を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="seisu-tashizan" >整数のたし算</option>
    <option value="seisu-hikizan">整数のひき算</option>
    <option value="seisu-kakezan">整数のかけ算</option>
    <option value="seisu-warizan">整数のわり算</option>
    <option value="seisu-muzu">整数の難しい計算</option>
    <option value="syosu">小数</option>
    <option value="bunsu">分数</option>
    <option value="wariai">割合</option>
    <option value="seifu">正負の数</option>
    <option value="moji">文字式の計算</option>
    <option value="houteishiki">方程式</option>
    <option value="renritsu">連立方程式</option>
    <option value="joho-koshiki">乗法公式</option>
    <option value="insubunkai">因数分解</option>
    <option value="heihokon">平方根</option>
    <option value="2ji-houteishiki">二次方程式</option>
    `;
    } else if (subject.value == "english") {
      //英語を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="newhorizon1">NewHorizon１年</option>
    <option value="newhorizon2">NewHorizon２年</option>
    <option value="newhorizon3">NewHorizon３年</option>
    <option value="newcrown1">NewCrown１年</option>
    <option value="newcrown2">NewCrown２年</option>
    <option value="newcrown3">NewCrown３年</option>
      `;
    } else if (subject.value == "sostudy") {
      //社会を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="history">歴史</option>
    <option value="geography">地理</option>
    <option value="citizen">公民</option>
    `;
    } else if (subject.value == "science") {
      //理科を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="science1">理科１年</option>
    <option value="science2">理科２年</option>
    <option value="science3">理科３年</option>
      `;
    } else if (subject.value == "japanese") {
      //国語を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="kanji1">漢字（書き）</option>
    <option value="kanji2">漢字（読み）</option>
      `;
    } else if (subject.value == "zatugaku") {
      //雑学を選択したら
      category.innerHTML = `
    <option value='1'>選択してください</option>
    <option value="zatugaku1">理科系</option>
    <option value="zatugaku2">社会系</option>
    <option value="zatugaku3">芸術系</option>
    <option value="zatugaku4">一般</option>
      `;
    } else {
      category.innerHTML = "<option value='1' selected>選択してください</option>";
    }
  };
  const ifCategory = function () {
    if (category.value == "seisu-tashizan") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1000">くりあげなし</option>
      <option value="m1100">くりあげあり</option>
      <option value="m1200">２けた</option>
      <option value="m1300">むずかしめ</option>
      `;
    } else if (category.value == "seisu-hikizan") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1400">くりさげなし</option>
      <option value="m1500">２けた</option>
      <option value="m1600">３けた</option>
      <option value="m1700">むずかしめ</option>
      `;
    } else if (category.value == "seisu-kakezan") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1800">九九</option>
      <option value="m1900">２けた</option>
      <option value="m2000">３けた</option>
      <option value="m2100">むずかしめ</option>
        `;
    } else if (category.value == "seisu-warizan") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m2200">〇〇÷１けた</option>
      <option value="m2300">〇〇÷２けた</option>
      <option value="m2400">あまりあり</option>
      <option value="m2500">むずかしめ</option>
      <option value="m2600">四則計算</option>
        `;
    } else if (category.value == "seisu-muzu") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m2700">かっこのある計算</option>
      <option value="m2800">累乗</option>
        `;
    } else if (category.value == "syosu") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m3000">たし算</option>
      <option value="m3100">ひき算</option>
      <option value="m3200">かけ算</option>
      <option value="m3300">わり算</option>
        `;
    } else if (category.value == "bunsu") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m3400">加減算（通分なし）</option>
      <option value="m3500">加減算（通分あり）</option>
      <option value="m3600">かけ算</option>
      <option value="m3700">わり算</option>
      <option value="m3800">約分</option>
      <option value="m3900">帯分数</option>
        `;
    } else if (category.value == "wariai") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m4000">百分率</option>
      <option value="m4100">歩合</option>
      <option value="m4200">比</option>
        `;
    } else if (category.value == "seifu") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5000">加減</option>
      <option value="m5200">乗除</option>
      <option value="m5400">四則計算</option>
         `;
    } else if (category.value == "moji") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5600">計算</option>
      <option value="m5700">分配法則</option>
      <option value="m5800">分数の計算</option>
        `;
    } else if (category.value == "houteishiki") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5900">加減のみ</option>
      <option value="m6000">乗除のみ</option>
      <option value="m6100">加減乗除</option>
        `;
    } else if (category.value == "renritsu") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6200">代入法</option>
      <option value="m6300">加減法</option>
        `;
    } else if (category.value == "joho-koshiki") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6400">公式１</option>
      <option value="m6500">公式２，３</option>
      <option value="m6600">公式４</option>
        `;
    } else if (category.value == "insubunkai") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6700">分配法則</option>
      <option value="m6800">公式１</option>
      <option value="m6900">公式２，３</option>
      <option value="m7000">公式４</option>
        `;
    } else if (category.value == "heihokon") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m7100">簡単化</option>
      <option value="m7200">加減</option>
      <option value="m7300">乗除</option>
        `;
    } else if (category.value == "2ji-houteishiki") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m7400">因数分解</option>
      <option value="m7500">解の公式</option>
        `;
    } else if (category.value == "newhorizon1") {
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
    } else if (category.value == "history") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="jomon">縄文時代</option>
      <option value="yayoi">弥生時代</option>
      <option value="kohun">古墳時代</option>
      <option value="asuka">飛鳥時代</option>
      <option value="nara">奈良時代</option>
      <option value="heian">平安時代</option>
      <option value="kamakura">鎌倉時代</option>
      <option value="nanboku">南北朝時代</option>
      <option value="muromati">室町時代</option>
      <option value="aduti">安土桃山時代</option>
      <option value="edo">江戸時代</option>
      <option value="meiji">明治時代</option>
      <option value="taisyo">大正時代</option>
      <option value="syowa">昭和時代</option>
      <option value="heisei">平成時代</option>
      `;
    } else if (category.value == "geography") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="geoworld">世界の姿</option>
      <option value="geoasia">アジア州</option>
      <option value="geoeuropa">ヨーロッパ州</option>
      <option value="geoafrica">アフリカ州</option>
      <option value="geonorthamerica">北アメリカ州</option>
      <option value="geosouthamerica">南アメリカ州</option>
      <option value="geooceania">オセアニア州</option>
      <option value="geojapan">日本の姿</option>
      <option value="geokyusyu">九州地方</option>
      <option value="geochugokushikoku">中国四国地方</option>
      <option value="geokinki">近畿地方</option>
      <option value="geochubu">中部地方</option>
      <option value="geokanto">関東地方</option>
      <option value="geotohoku">東北地方</option>
      <option value="geohokkaido">北海道地方</option>
      `;
    } else if (category.value == "citizen") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="citijiji">時事問題</option>
      <option value="citigendai">現代社会</option>
      <option value="citikenpo">憲法</option>
      <option value="citiseiji">政治</option>
      <option value="citikeizai">経済</option>
      <option value="citikokusai">国際</option>
      `;
    } else if (category.value == "science1") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="scseibutu1">植物の生活と種類</option>
      <option value="sckagaku1">物質の姿</option>
      <option value="scbuturi1">身近な物理現象</option>
      <option value="sctigaku">大地の変化</option>
      `;
    } else if (category.value == "science2") {
      tangen.innerHTML = `
      <option value="1">選択しください</option>
      <option value="sckagaku2">化学変化と原子・分子</option>
      <option value="scseibutu2">生物の体のつくり</option>
      <option value="scbuturi2">電流とその利用</option>
      <option value="sctigaku2">気象と天気の変化</option>
      `;
    } else if (category.value == "science3") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="scbuturi3">運動とエネルギー</option>
      <option value="scseibutu3">生命と自然のつながり</option>
      <option value="sckagaku3">化学変化とイオン</option>
      <option value="sctigaku3">地球と宇宙</option>
      <option value="sceirth">地球の明るい未来</option>
      `;
    } else if (category.value == "kanji1") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="wkanji1">小学１年生（書き）</option>
      <option value="wkanji2">小学２年生（書き）</option>
      <option value="wkanji3">小学３年生（書き）</option>
      <option value="wkanji4">小学４年生（書き）</option>
      <option value="wkanji5">小学５年生（書き）</option>
      <option value="wkanji6">小学６年生（書き）</option>
      `;
    } else if (category.value == "kanji2") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="rkanji1">小学１年生（読み）</option>
      <option value="rkanji2">小学２年生（読み）</option>
      <option value="rkanji3">小学３年生（読み）</option>
      <option value="rkanji4">小学４年生（読み）</option>
      <option value="rkanji5">小学５年生（読み）</option>
      <option value="rkanji6">小学６年生（読み）</option>
      `;
    } else if (category.value == "zatugaku1") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="zatu1">宇宙</option>
      <option value="zatu2">地球</option>
      <option value="zatu3">生き物</option>
      `;
    } else if (category.value == "zatugaku2") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="zatu4">歴史</option>
      <option value="zatu5">世界の国々</option>
      `;
    } else if (category.value == "zatugaku3") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="zatu6">文学</option>
      <option value="zatu7">音楽</option>
      `;
    } else if (category.value == "zatugaku4") {
      tangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="zatu8">インターネット</option>
      `;
    } else {
      tangen.innerHTML = "<option value='1'>選択してください</option>";
    }
  };
  const ifAddSubject = function () {
    if (addsubject.value == "math") {
      //数学を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="seisu-tashizan">整数のたし算</option>
        <option value="seisu-hikizan">整数のひき算</option>
        <option value="seisu-kakezan">整数のかけ算</option>
        <option value="seisu-warizan">整数のわり算</option>
        <option value="seisu-muzu">整数の難しい計算</option>
        <option value="syosu">小数</option>
        <option value="bunsu">分数</option>
        <option value="wariai">割合</option>
        <option value="seifu">正負の数</option>
        <option value="moji">文字式の計算</option>
        <option value="houteishiki">方程式</option>
        <option value="renritsu">連立方程式</option>
        <option value="joho-koshiki">乗法公式</option>
        <option value="insubunkai">因数分解</option>
        <option value="heihokon">平方根</option>
        <option value="2ji-houteishiki">二次方程式</option>
        `;
    } else if (addsubject.value == "english") {
      //英語を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="newhorizon1">NewHorizon１年</option>
        <option value="newhorizon2">NewHorizon２年</option>
        <option value="newhorizon3">NewHorizon３年</option>
        <option value="newcrown1">NewCrown１年</option>
        <option value="newcrown2">NewCrown２年</option>
        <option value="newcrown3">NewCrown３年</option>
          `;
    } else if (addsubject.value == "sostudy") {
      //社会を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="history">歴史</option>
        <option value="geography">地理</option>
        <option value="citizen">公民</option>
        `;
    } else if (addsubject.value == "science") {
      //理科を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="science1">理科１年</option>
        <option value="science2">理科２年</option>
        <option value="science3">理科３年</option>
          `;
    } else if (addsubject.value == "japanese") {
      //国語を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="kanji1">漢字（書き）</option>
        <option value="kanji2">漢字（読み）</option>
          `;
    } else if (addsubject.value == "zatugaku") {
      //雑学を選択したら
      addcategory.innerHTML = `
        <option value='1'>選択してください</option>
        <option value="zatugaku1">理科系</option>
        <option value="zatugaku2">社会系</option>
        <option value="zatugaku3">芸術系</option>
        <option value="zatugaku4">一般</option>

          `;
    } else {
      addcategory.innerHTML = "<option value='1'>選択してください</option>";
    }
  };
  const ifAddCategory = function () {
    if (addcategory.value == "seisu-tashizan") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1000">くりあげなし</option>
      <option value="m1100">くりあげあり</option>
      <option value="m1200">２けた</option>
      <option value="m1300">むずかしめ<</option>
      `;
    } else if (addcategory.value == "seisu-hikizan") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1400">くりさげなし</option>
      <option value="m1500">２けた</option>
      <option value="m1600">３けた</option>
      <option value="m1700">むずかしめ</option>
      `;
    } else if (addcategory.value == "seisu-kakezan") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m1800">九九</option>
      <option value="m1900">２けた</option>
      <option value="m2000">３けた</option>
      <option value="m2100">むずかしめ</option>
        `;
    } else if (addcategory.value == "seisu-warizan") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m2200">〇〇÷１けた</option>
      <option value="m2300">〇〇÷２けた</option>
      <option value="m2400">あまりあり</option>
      <option value="m2500">むずかしめ</option>
      <option value="m2600">四則計算</option>
        `;
    } else if (addcategory.value == "seisu-muzu") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m2700">かっこのある計算</option>
      <option value="m2800">累乗</option>
        `;
    } else if (addcategory.value == "syosu") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m3000">たし算</option>
      <option value="m3100">ひき算</option>
      <option value="m3200">かけ算</option>
      <option value="m3300">わり算</option>
        `;
    } else if (addcategory.value == "bunsu") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m3400">加減算（通分なし）</option>
      <option value="m3500">加減算（通分あり）</option>
      <option value="m3600">かけ算</option>
      <option value="m3700">わり算</option>
      <option value="m3800">約分</option>
      <option value="m3900">帯分数</option>
        `;
    } else if (addcategory.value == "wariai") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m4000">百分率</option>
      <option value="m4100">歩合</option>
      <option value="m4200">比</option>
        `;
    } else if (addcategory.value == "seifu") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5000">加減</option>
      <option value="m5200">乗除</option>
      <option value="m5400">四則計算</option>
         `;
    } else if (addcategory.value == "moji") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5600">計算</option>
      <option value="m5700">分配法則</option>
      <option value="m5800">分数の計算</option>
        `;
    } else if (addcategory.value == "houteishiki") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m5900">加減のみ</option>
      <option value="m6000">乗除のみ</option>
      <option value="m6100">加減乗除</option>
        `;
    } else if (addcategory.value == "renritsu") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6200">代入法</option>
      <option value="m6300">加減法</option>
        `;
    } else if (addcategory.value == "joho-koshiki") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6400">公式１</option>
      <option value="m6500">公式２，３</option>
      <option value="m6600">公式４</option>
        `;
    } else if (addcategory.value == "insubunkai") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m6700">分配法則</option>
      <option value="m6800">公式１</option>
      <option value="m6900">公式２，３</option>
      <option value="m7000">公式４</option>
        `;
    } else if (addcategory.value == "heihokon") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m7100">簡単化</option>
      <option value="m7200">加減</option>
      <option value="m7300">乗除</option>
        `;
    } else if (addcategory.value == "2ji-houteishiki") {
      addtangen.innerHTML = `
      <option value="1">選択してください</option>
      <option value="m7400">因数分解</option>
      <option value="m7500">解の公式</option>
        `;
    } else if (addcategory.value == "newhorizon1") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="U0">Unit0</option>
    <option value="U1">Unit1</option>
    <option value="U2">Unit2</option>
    <option value="U3">Unit3</option>
    <option value="U4">Unit4</option>
    <option value="U5">Unit5</option>
    <option value="U6">Unit6</option>
    <option value="U7">Unit7</option>
    <option value="U8">Unit8</option>
    <option value="U9">Unit9</option>
    <option value="U10">Unit10</option>      
    `;
    } else if (addcategory.value == "newhorizon2") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="U0">Unit0</option>
    <option value="U1">Unit1</option>
    <option value="U2">Unit2</option>
    <option value="U3">Unit3</option>
    <option value="U4">Unit4</option>
    <option value="U5">Unit5</option>
    <option value="U6">Unit6</option>
    <option value="U7">Unit7</option>
    `;
    } else if (addcategory.value == "newhorizon3") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="U0">Unit0</option>
    <option value="U1">Unit1</option>
    <option value="U2">Unit2</option>
    <option value="U3">Unit3</option>
    <option value="U4">Unit4</option>
    <option value="U5">Unit5</option>
    <option value="U6">Unit6</option>
    `;
    } else if (addcategory.value == "newcrown1") {
      addtangen.innerHTML = `
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
    } else if (addcategory.value == "newcrown2") {
      addtangen.innerHTML = `
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
    } else if (addcategory.value == "newcrown3") {
      addtangen.innerHTML = `
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
    } else if (addcategory.value == "history") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="jomon">縄文時代</option>
    <option value="yayoi">弥生時代</option>
    <option value="kohun">古墳時代</option>
    <option value="asuka">飛鳥時代</option>
    <option value="nara">奈良時代</option>
    <option value="heian">平安時代</option>
    <option value="kamakura">鎌倉時代</option>
    <option value="nanboku">南北朝時代</option>
    <option value="muromati">室町時代</option>
    <option value="aduti">安土桃山時代</option>
    <option value="edo">江戸時代</option>
    <option value="meiji">明治時代</option>
    <option value="taisyo">大正時代</option>
    <option value="syowa">昭和時代</option>
    <option value="heisei">平成時代</option>
    `;
    } else if (addcategory.value == "geography") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="geoworld">世界の姿</option>
    <option value="geoasia">アジア州</option>
    <option value="geoeuropa">ヨーロッパ州</option>
    <option value="geoafrica">アフリカ州</option>
    <option value="geonorthamerica">北アメリカ州</option>
    <option value="geosouthamerica">南アメリカ州</option>
    <option value="geooceania">オセアニア州</option>
    <option value="geojapan">日本の姿</option>
    <option value="geokyusyu">九州地方</option>
    <option value="geochugokushikoku">中国四国地方</option>
    <option value="geokinki">近畿地方</option>
    <option value="geochubu">中部地方</option>
    <option value="geokanto">関東地方</option>
    <option value="geotohoku">東北地方</option>
    <option value="geohokkaido">北海道地方</option>
    `;
    } else if (addcategory.value == "citizen") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="citijiji">時事問題</option>
    <option value="citigendai">現代社会</option>
    <option value="citikenpo">憲法</option>
    <option value="citiseiji">政治</option>
    <option value="citikeizai">経済</option>
    <option value="citikokusai">国際</option>
    `;
    } else if (addcategory.value == "science1") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="scseibutu1">植物の生活と種類</option>
    <option value="sckagaku1">物質の姿</option>
    <option value="scbuturi1">身近な物理現象</option>
    <option value="sctigaku">大地の変化</option>
    `;
    } else if (addcategory.value == "science2") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="sckagaku2">化学変化と原子・分子</option>
    <option value="scseibutu2">生物の体のつくり</option>
    <option value="scbuturi2">電流とその利用</option>
    <option value="sctigaku2">気象と天気の変化</option>
    `;
    } else if (addcategory.value == "science3") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="scbuturi3">運動とエネルギー</option>
    <option value="scseibutu3">生命と自然のつながり</option>
    <option value="sckagaku3">化学変化とイオン</option>
    <option value="sctigaku3">地球と宇宙</option>
    <option value="sceirth">地球の明るい未来</option>
    `;
    } else if (addcategory.value == "kanji1") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="wkanji1">小学１年生（書き）</option>
    <option value="wkanji2">小学２年生（書き）</option>
    <option value="wkanji3">小学３年生（書き）</option>
    <option value="wkanji4">小学４年生（書き）</option>
    <option value="wkanji5">小学５年生（書き）</option>
    <option value="wkanji6">小学６年生（書き）</option>
    `;
    } else if (addcategory.value == "kanji2") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="rkanji1">小学１年生（読み）</option>
    <option value="rkanji2">小学２年生（読み）</option>
    <option value="rkanji3">小学３年生（読み）</option>
    <option value="rkanji4">小学４年生（読み）</option>
    <option value="rkanji5">小学５年生（読み）</option>
    <option value="rkanji6">小学６年生（読み）</option>
    `;
    } else if (addcategory.value == "zatugaku1") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="zatu1">宇宙</option>
    <option value="zatu2">地球</option>
    <option value="zatu3">生き物</option>
    `;
    } else if (addcategory.value == "zatugaku2") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="zatu4">歴史</option>
    <option value="zatu5">世界の国々</option>
    `;
    } else if (addcategory.value == "zatugaku3") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="zatu6">文学</option>
    <option value="zatu7">音楽</option>
    `;
    } else if (addcategory.value == "zatugaku4") {
      addtangen.innerHTML = `
    <option value="1">選択してください</option>
    <option value="zatu8">インターネット</option>
    `;
    } else {
      addtangen.innerHTML = "<option value='1'>選択してください</option>";
    }
  };

  //ドロップダウンをチェンジした時にリストを呼び出してhtmlを動的に変更
  subject.addEventListener("change", function () {
    ifSubject();
  });
  category.addEventListener("change", function () {
    ifCategory();
  });
  addsubject.addEventListener("change", function () {
    ifAddSubject();
  });
  addcategory.addEventListener("change", function () {
    ifAddCategory();
  });

  // 区分プルダウンの処理
  ifSubject();
  console.log("hello");
  let selectedValue = localStorage.getItem("selectedValue");
  if (selectedValue === null || selectedValue === undefined) {
    document.getElementById("category").value = "";
  } else {
    document.getElementById("category").value = selectedValue;
  }
  document.getElementById("category").addEventListener("change", function () {
    selectedValue = document.getElementById("category").value;
    localStorage.setItem("selectedValue", selectedValue);
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

  //
  ifAddSubject();
  let selectedValue3 = localStorage.getItem("selectedValue3");
  if (selectedValue3 === null || selectedValue3 === undefined) {
    document.getElementById("addcategory").value = "";
  } else {
    document.getElementById("addcategory").value = selectedValue3;
  }
  document.getElementById("addcategory").addEventListener("change", function () {
    selectedValue3 = document.getElementById("addcategory").value;
    localStorage.setItem("selectedValue3", selectedValue3);
  });

  //
  ifAddCategory();
  let selectedValue4 = localStorage.getItem("selectedValue4");
  if (selectedValue2 === null || selectedValue4 === undefined) {
    document.getElementById("addtangen").value = "";
  } else {
    document.getElementById("addtangen").value = selectedValue4;
  }
  document.getElementById("addtangen").addEventListener("change", function () {
    selectedValue4 = document.getElementById("addtangen").value;
    localStorage.setItem("selectedValue4", selectedValue4);
  });
};
