const express = require("express");
const path = require("path");
const router = express.Router();
const app = express();
//const mjAPI = require("mathjax-node");
const mysql = require("mysql"); //MYSQLデータベース
//MySQLと接続します
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yasuhi5",
  database: "mondo",
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

////////////////    科目ページからの印刷     /////////////////

router.post(
  "/other",
  (req, res, next) => {
    const quecount = parseInt(req.body.quecount);
    const tableName = req.body.tableName;
    const category = req.body.category;
    let tangen = req.body.tangen;
    const printrange = req.body.printrange;
    const categoryerror = [];
    const tangenerror = [];
    const errors = [];
    if (category === "1" || category === "") {
      categoryerror.push("区分を選択してください");
      errors.push("cateerror");
    }
    if (tangen === "1" || tangen === "") {
      tangenerror.push("単元を選択してください");
      errors.push("tanerror");
    }
    if (errors.length > 0) {
      console.log(errors);
      res.render("eng.ejs", {
        categoryerror: categoryerror,
        tangenerror: tangenerror,
        category: category,
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    const quecount = parseInt(req.body.quecount);
    const tableName = req.body.tableName;
    const category = req.body.category;
    let tangen = req.body.tangen;
    const printrange = req.body.printrange;
    const categoryerror = [];
    const tangenerror = [];
    const errors = [];
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
      if (tableName === "sostudy") {
        tangen = ["jomon", "yayoi", "kohun", "asuka"];
      } else if (tableName === "science") {
        tangen = ["scseibutu1", "sckagaku1", "scbuturi1", "sctigaku1"];
      } else if (tableName === "zatugaku") {
        tangen = ["zatu1", "zatu2", "zatu3", "zatu4"];
      } else if (tableName === "japanese") {
        tangen = ["wkanji1", "wkanji2", "wkanji3", "wkanji4"];
      } else if (tableName === "math") {
        tangen = ["m1000", "m1400", "m1800", "m2200"];
      }
    }
    //ここからまるごと
    if (printrange === "printall") {
      async function getQueryResults(tangen, tableName) {
        console.log("printall");
        try {
          const dataCountResult = await new Promise((resolve, reject) => {
            connection.query(
              `SELECT COUNT(question) FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}sub.tangen = ?`,
              [tangen],
              (error, results) => {
                if (error) {
                  console.error(error);
                  reject(error);
                }
                resolve(results);
              }
            );
          });
          const dataCount = dataCountResult[0]["COUNT(question)"];
          const pageCount = Math.ceil(dataCount / quecount);
          const queryResults = await new Promise((resolve, reject) => {
            connection.query(
              `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}.tangen = ?`,
              [tangen],
              (error, results) => {
                if (error) {
                  console.error(error);
                  reject(error);
                }
                resolve(results);
              }
            );
          });
          for (let j = 0; j < queryResults.length; j++) {
            let count = queryResults[j].count;
            let newCount = count + 1;
            let id = queryResults[j].id;
            await new Promise((resolve, reject) => {
              connection.query(`UPDATE ${tableName} SET count = ? WHERE id = ?`, [newCount, id], (error, results) => {
                if (error) {
                  console.error(error);
                  reject(error);
                }
                resolve(results);
              });
            });
          }
          return { queryResults, pageCount };
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      try {
        const { queryResults, pageCount } = await getQueryResults(tangen, tableName);
        if (tableName === "japanese") {
          res.render("jpnPrint", { queryResults, pageCount, quecount, tangen, tableName });
        } else {
          res.render("otherPrint", { queryResults, pageCount, quecount, tangen, tableName });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }

      //ここまでまるごと

      //ここからシャッフル
    } else if (printrange === "printshufful") {
      console.log("printshufful");
      const length = tangen.length;
      const pageCount = 1;
      for (let i = 0; i < length; i++) {
        //tangenの個数分繰り返す
        for (let j = 0; j < 14; j++) {
          //15倍にする
          tangen.push(tangen[i]);
        }
      }
      tangen.sort(() => Math.random() - 0.5); //tangenをランダムに並べる
      tangen.splice(15, tangen.length - 15); //余分なtangenを切り捨て

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
                }
              );
            });
            queryResults.push(results);
            const newCount = (results.count || 0) + 1;
            const id = results[0].id;
            await new Promise((resolve, reject) => {
              connection.query(`UPDATE ${tableName} SET count = ? WHERE id = ?`, [newCount, id], (error, results) => {
                if (error) {
                  consoles.error(error);
                  reject(error);
                }
                resolve();
              });
            });
          } catch (error) {
            console.error(error);
            res.status(500).send("エラーが発生しました。");
            return;
          }
        }
        return queryResults;
      }
      //ここまでシャッフル
      let queryResults = await getQueryResults(tangen, tableName);
      queryResults = queryResults.flat();
      if (tableName === "japanese") {
        res.render("jpnPrint", { queryResults, pageCount, quecount, tangen, tableName });
      } else {
        res.render("otherPrint", { queryResults, pageCount, quecount, tangen, tableName });
      }
    }
  }
);

///////////////     マイページからの印刷     ////////////////

router.post(
  "/check",
  (req, res, next) => {
    const username = req.session.username;
    if (username === void 0) {
      console.log("Not User");
      res.redirect("/login");
    } else {
      next();
    }
  },
  (req, res, next) => {
    //選択忘れチェック
    const tableName = req.body.subject;
    const myselect = req.body.subject;
    const category = req.body.category;
    const tangen = req.body.tangen;
    const mymondo = req.body.mymondo;
    const lists = [];
    const subjecterror = [];
    const categoryerror = [];
    const tangenerror = [];
    const checkerror = [];
    const errors = [];
    if (tableName === "") {
      subjecterror.push("科目を選択してください");
      errors.push("suberror");
    }
    if (category === "1" || category === "") {
      categoryerror.push("区分を選択してください");
      errors.push("cateerror");
    }
    if (tangen === "1" || tangen === "") {
      tangenerror.push("単元を選択してください");
      errors.push("tanerror");
    }
    if (errors.length > 0) {
      res.render("mypage.ejs", {
        lists: lists,
        tableName: tableName,
        category: category,
        tangen: tangen,
        mymondo: mymondo,
        subjecterror: subjecterror,
        categoryerror: categoryerror,
        tangenerror: tangenerror,
        checkerror: checkerror,
        myselect: myselect,
      });
    } else {
      next();
    }
  },
  (req, res, next) => {
    //選択忘れチェック
    const checkedId = req.body.check;
    let tableName = req.body.subject;
    const myselect = req.body.subject;
    let category = req.body.category;
    let tangen = req.body.tangen;
    const mymondo = req.body.mymondo;
    let lists = [];
    const subjecterror = [];
    const categoryerror = [];
    const tangenerror = [];
    const checkerror = [];
    const errors = [];
    if (checkedId === void 0) {
      console.log("印刷エラー");
      checkerror.push("問答を選択してください");
      errors.push("suberror");
      if (errors.length > 0) {
        let Editor = req.session.username;
        console.log(Editor);
        if (mymondo === "on") {
          console.log("mymondo=on");
          Editor = "and " + tableName + ".editor = " + "'" + Editor + "'";
        } else {
          Editor = "";
        }
        connection.query(
          `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}.tangen = ? ${Editor}`,
          [req.body.tangen],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send("エラーが発生しました。");
              return;
            }
            results.forEach((list) => {
              if (list.date === null) {
                list.date = "****";
              } else {
                //日付表示フォーマット
                const date2 = list.date;
                const y = date2.getFullYear();
                const m = date2.getMonth() + 1;
                const d = date2.getDate();
                const date3 = y + "/" + m + "/" + d;
                list.date = date3;
              }
            });
            lists = results;
            res.render("mypage.ejs", {
              lists: lists,
              tableName: tableName,
              category: category,
              tangen: tangen,
              mymondo: mymondo,
              subjecterror: subjecterror,
              categoryerror: categoryerror,
              tangenerror: tangenerror,
              checkerror: checkerror,
              myselect: myselect,
            });
          }
        );
      }
    } else {
      next();
    }
  },

  async (req, res) => {
    const body = req.body;
    const checkedId = req.body.check;
    const tableName = req.body.subject;
    const tangen = req.body.tangen;
    const dataCount = checkedId.length;
    console.log(dataCount);
    const quecount = req.body.myquecount;
    console.log(quecount);
    const pageCount = Math.ceil(dataCount / quecount);
    console.log(pageCount);
    async function getQueryResults(checkedId, tableName) {
      let queryResults = [];
      if (tangen && Array.isArray(checkedId)) {
        checkedId.forEach((id) => {
          console.log("checkedId is array");
        });
      } else if (typeof checkedId === "string") {
        //選択が１つだった場合オブジェクトを配列にする
        checkedId = [checkedId];
        checkedId.forEach((id) => {
          console.log("checkedId is string");
        });
      }
      for (let i = 0; i < checkedId.length; i++) {
        const id = checkedId[i];
        try {
          const results = await new Promise((resolve, reject) => {
            connection.query(
              `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}.id = ?`,
              [id],
              (error, results) => {
                if (error) {
                  console.error(error);
                  reject(error);
                }
                console.log("SELECT query OK");
                resolve(results);
              }
            );
          });
          console.log(results);
          queryResults.push(results);
          const newCount = (results[0].count || 0) + 1;
          const resultId = results[0].id;
          await new Promise((resolve, reject) => {
            connection.query(`UPDATE ${tableName} SET count = ? WHERE id = ?`, [newCount, resultId], (error, results) => {
              if (error) {
                consoles.error(error);
                reject(error);
              }
              resolve();
            });
          });
        } catch (error) {
          console.error(error);
          res.status(500).send("エラーが発生しました。");
          return;
        }
      }
      console.log("UPDATE query OK");
      return queryResults;
    }
    let queryResults = await getQueryResults(checkedId, tableName);
    queryResults = queryResults.flat();
    console.log(queryResults);
    console.log(pageCount);
    console.log(quecount);
    console.log(tangen);
    console.log(tableName);

    if (tableName === "japanese") {
      console.log("jpnPrint");
      res.render("jpnPrint", { queryResults, pageCount, quecount, tangen, tableName });
    } else {
      console.log("otherPrint");
      res.render("otherPrint", { queryResults, pageCount, quecount, tangen, tableName });
    }
  }
);

module.exports = router;
