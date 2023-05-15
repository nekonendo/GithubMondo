const express = require("express");
const path = require("path");
const router = express.Router();
const app = express();
const mjAPI = require("mathjax-node");
const pdf = require("html-pdf");
const mysql = require("mysql"); //MYSQLデータベース
//MySQLと接続します
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yasuhi5",
  database: "mondo",
});

const mjConfig = {
  extensions: "",
  fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2",
  linebreaks: { automatic: true },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
};
const pdfOptions = {
  renderDelay: "1000",
  zoom: 10.0,
  format: "A4",
  quality: "75",
  orientation: "portrait",
  //orientation: "landscape",
  stylesheet: "/stylesheets/stylesheet3.css",
  border: {
    top: "0in",
    bottom: "0in",
    left: "0in",
    right: "0in",
  },
  scale: 0.7,
};
mjAPI.start();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

router.post("/math", async (req, res) => {
  const quecount = parseInt(req.body.quecount);
  const tableName = req.body.tableName;
  let tangen = req.body.tangen;

  if (tangen && Array.isArray(tangen)) {
    tangen.forEach((tang) => {
      console.log("tangen is array");
    });
  } else if (typeof tangen === "string") {
    //選択が１つだった場合オブジェクトを配列にする
    tangen = [tangen];
    tangen.forEach((tang) => {
      console.log("tangen is string");
    });
  } else {
    //選択されていなかった時
    console.log("tangen = null");
    tangen = ["m1000", "m1400", "m1800", "m2200"];
  }
  console.log(tangen);
  const length = tangen.length;
  for (let i = 0; i < length; i++) {
    //tangenの個数分繰り返す
    for (let j = 0; j < 14; j++) {
      //15倍にする
      tangen.push(tangen[i]);
    }
  }
  tangen.sort(() => Math.random() - 0.5); //tangenをランダムに並べる
  tangen.splice(15, tangen.length - 15); //余分なtangenを切り捨て

  console.log(tangen);

  async function getQueryResults(tangen, tableName) {
    let queryResults = [];

    for (let i = 0; i < tangen.length; i++) {
      const tang = tangen[i];

      try {
        const results = await new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}sub.tangen = ? ORDER BY RAND() LIMIT 1`,
            [tang],
            (error, results) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              resolve(results);
              console.log(results[0].id);
            }
          );
        });
        queryResults.push(results);
        const newCount = (results.count || 0) + 1;
        const id = results[0].id;
        await new Promise((resolve, reject) => {
          console.log(newCount);
          console.log(id);
          connection.query(
            `UPDATE ${tableName} SET count = ? WHERE id = ?`,
            [newCount, id],
            (error, results) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              resolve();
            }
          );
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました。");
        return;
      }
    }

    return queryResults;
  }

  const queryResults = await getQueryResults(tangen, tableName); // 1. getQueryResults関数の呼び出しを非同期に行う
  console.log(queryResults);
  const mathprint = req.body;
  console.log(mathprint);
  const begin = "\\begin{aligned} &\\quad "; //接頭句
  const br = "\\\\\\\\[12pt] &\\quad "; //改行
  const end = " \\end{aligned}"; //接尾句
  const no1 = "(1)\\ \\ "; //問１
  const no2 = "(2)\\ \\ "; //問２
  const no3 = "(3)\\ \\ "; //問３
  const no4 = "(4)\\ \\ "; //問４
  const no5 = "(5)\\ \\ "; //問５
  const no6 = "(6)\\ \\ "; //問６
  const no7 = "(7)\\ \\ "; //問７
  const no8 = "(8)\\ \\ "; //問８
  const no9 = "(9)\\ \\ "; //問９
  const no10 = "(10)\\ \\ "; //問10
  const no11 = "(11)\\ \\ "; //問11
  const no12 = "(12)\\ \\ "; //問12
  const no13 = "(13)\\ \\ "; //問13
  const no14 = "(14)\\ \\ "; //問14
  const no15 = "(15)\\ \\ "; //問15
  const text1 = queryResults[0][0].question;
  const text2 = queryResults[1][0].question;
  const text3 = queryResults[2][0].question;
  const text4 = queryResults[3][0].question;
  const text5 = queryResults[4][0].question;
  const text6 = queryResults[5][0].question;
  const text7 = queryResults[6][0].question;
  const text8 = queryResults[7][0].question;
  const text9 = queryResults[8][0].question;
  const text10 = queryResults[9][0].question;
  const text11 = queryResults[10][0].question;
  const text12 = queryResults[11][0].question;
  const text13 = queryResults[12][0].question;
  const text14 = queryResults[13][0].question;
  const text15 = queryResults[14][0].question;
  const ans1 = queryResults[0][0].answer;
  const ans2 = queryResults[1][0].answer;
  const ans3 = queryResults[2][0].answer;
  const ans4 = queryResults[3][0].answer;
  const ans5 = queryResults[4][0].answer;
  const ans6 = queryResults[5][0].answer;
  const ans7 = queryResults[6][0].answer;
  const ans8 = queryResults[7][0].answer;
  const ans9 = queryResults[8][0].answer;
  const ans10 = queryResults[9][0].answer;
  const ans11 = queryResults[10][0].answer;
  const ans12 = queryResults[11][0].answer;
  const ans13 = queryResults[12][0].answer;
  const ans14 = queryResults[13][0].answer;
  const ans15 = queryResults[14][0].answer;
  let texString1;
  let texString2;
  if (quecount == 15) {
    const que =
      begin +
      no1 +
      text1 +
      br +
      no2 +
      text2 +
      br +
      no3 +
      text3 +
      br +
      no4 +
      text4 +
      br +
      no5 +
      text5 +
      br +
      no6 +
      text6 +
      br +
      no7 +
      text7 +
      br +
      no8 +
      text8 +
      br +
      no9 +
      text9 +
      br +
      no10 +
      text10 +
      br +
      no11 +
      text11 +
      br +
      no12 +
      text12 +
      br +
      no13 +
      text13 +
      br +
      no14 +
      text14 +
      br +
      no15 +
      text15 +
      br +
      end;
    console.log(que);
    texString1 = que;
    const ans =
      begin +
      no1 +
      ans1 +
      br +
      no2 +
      ans2 +
      br +
      no3 +
      ans3 +
      br +
      no4 +
      ans4 +
      br +
      no5 +
      ans5 +
      br +
      no6 +
      ans6 +
      br +
      no7 +
      ans7 +
      br +
      no8 +
      ans8 +
      br +
      no9 +
      ans9 +
      br +
      no10 +
      ans10 +
      br +
      no11 +
      ans11 +
      br +
      no12 +
      ans12 +
      br +
      no13 +
      ans13 +
      br +
      no14 +
      ans14 +
      br +
      no15 +
      ans15 +
      br +
      end;
    console.log(ans);
    texString2 = ans;
  } else if (quecount == 10) {
    const que =
      begin +
      no1 +
      text1 +
      br +
      no2 +
      text2 +
      br +
      no3 +
      text3 +
      br +
      no4 +
      text4 +
      br +
      no5 +
      text5 +
      br +
      no6 +
      text6 +
      br +
      no7 +
      text7 +
      br +
      no8 +
      text8 +
      br +
      no9 +
      text9 +
      br +
      no10 +
      text10 +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      end;

    console.log(que);
    texString1 = que;
    const ans =
      begin +
      no1 +
      ans1 +
      br +
      no2 +
      ans2 +
      br +
      no3 +
      ans3 +
      br +
      no4 +
      ans4 +
      br +
      no5 +
      ans5 +
      br +
      no6 +
      ans6 +
      br +
      no7 +
      ans7 +
      br +
      no8 +
      ans8 +
      br +
      no9 +
      ans9 +
      br +
      no10 +
      ans10 +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      v;
    br + end;

    console.log(ans);
    texString2 = ans;
  } else if (quecount == 5) {
    const que =
      begin +
      no1 +
      text1 +
      br +
      no2 +
      text2 +
      br +
      no3 +
      text3 +
      br +
      no4 +
      text4 +
      br +
      no5 +
      text5 +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      end;
    console.log(que);
    texString1 = que;
    const ans =
      begin +
      no1 +
      ans1 +
      br +
      no2 +
      ans2 +
      br +
      no3 +
      ans3 +
      br +
      no4 +
      ans4 +
      br +
      no5 +
      ans5 +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      br +
      end;

    console.log(ans);
    texString2 = ans;
  }
  mjAPI.typeset(
    //問題画像
    {
      math: texString1,
      format: "TeX",
      svg: true,
      config: mjConfig,
    },
    (data1) => {
      const svg1 = data1.svg;
      const svgBase641 = Buffer.from(svg1).toString("base64"); // Base64エンコードされたSVG
      const imgTag1 = `<img src="data:image/svg+xml;base64,${svgBase641}" />`; // imgタグ

      mjAPI.typeset(
        //解答画像
        {
          math: texString2,
          format: "TeX",
          svg: true,
          config: mjConfig,
        },
        (data2) => {
          const svg2 = data2.svg;
          const svgBase642 = Buffer.from(svg2).toString("base64"); // Base64エンコードされたSVG
          const imgTag2 = `<img src="data:image/svg+xml;base64,${svgBase642}" />`; // imgタグ

          res.render("mathpdf", { imgTag2, imgTag1, quecount }, (err, html) => {
            if (err) {
              console.error(err);
            } else {
              pdf.create(html, pdfOptions).toStream((err, stream) => {
                if (err) {
                  console.error(err);
                } else {
                  res.contentType("application/pdf");
                  stream.pipe(res);
                }
              });
            }
          });
        }
      );
    }
  );
});

//英語、社会、理科、雑学
router.post("/other", async (req, res) => {
  const quecount = parseInt(req.body.quecount);
  const tableName = req.body.tableName;
  let tangen = req.body.tangen;
  console.log(req.body);
  if (tangen && Array.isArray(tangen)) {
    tangen.forEach((tang) => {
      console.log("tangen is array");
    });
  } else if (typeof tangen === "string") {
    //選択が１つだった場合オブジェクトを配列にする
    tangen = [tangen];
    tangen.forEach((tang) => {
      console.log("tangen is string");
    });
  } else {
    //選択されていなかった時
    console.log("tangen = null");
    if (tableName === "english") {
      tangen = ["1U0", "1U1", "1U2", "1U3"];
    } else if (tableName === "sostudy") {
      tangen = ["jomon", "yayoi", "kohun", "asuka"];
    } else if (tableName === "science") {
      tangen = ["scseibutu1", "sckagaku1", "scbuturi1", "sctigaku1"];
    } else if (tableName === "zatugaku") {
      tangen = ["zatu1", "zatu2", "zatu3", "zatu4"];
    }
  }
  console.log(tangen);
  const length = tangen.length;
  for (let i = 0; i < length; i++) {
    //tangenの個数分繰り返す
    for (let j = 0; j < 14; j++) {
      //15倍にする
      tangen.push(tangen[i]);
    }
  }
  tangen.sort(() => Math.random() - 0.5); //tangenをランダムに並べる
  tangen.splice(15, tangen.length - 15); //余分なtangenを切り捨て

  console.log(tangen);

  async function getQueryResults(tangen, tableName) {
    let queryResults = [];

    for (let i = 0; i < tangen.length; i++) {
      const tang = tangen[i];

      try {
        const results = await new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}sub.tangen = ? ORDER BY RAND() LIMIT 1`,
            [tang],
            (error, results) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              resolve(results);
              console.log(results[0].id);
            }
          );
        });
        queryResults.push(results);
        const newCount = (results.count || 0) + 1;
        const id = results[0].id;
        await new Promise((resolve, reject) => {
          console.log(newCount);
          console.log(id);
          connection.query(
            `UPDATE ${tableName} SET count = ? WHERE id = ?`,
            [newCount, id],
            (error, results) => {
              if (error) {
                console.error(error);
                reject(error);
              }
              resolve();
            }
          );
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("エラーが発生しました。");
        return;
      }
    }
    return queryResults;
  }

  const queryResults = await getQueryResults(tangen, tableName); // 1. getQueryResults関数の呼び出しを非同期に行う
  console.log("queryResultsの中身");
  console.log(queryResults);
  const otherprint = req.body;
  console.log("otherprintの中身");

  console.log(otherprint);

  res.render("otherpdf", { queryResults, quecount, tangen }, (err, html) => {
    if (err) {
      console.error(err);
    } else {
      pdf.create(html, pdfOptions).toStream((err, stream) => {
        if (err) {
          console.error(err);
        } else {
          res.contentType("application/pdf");
          stream.pipe(res);
        }
      });
    }
  });
});
//router.post("/jpn", (req, res) => {

module.exports = router;
