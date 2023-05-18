const express = require("express");
const mysql = require("mysql"); //MYSQLデータベース
const router = express.Router();
const path = require("path");
router.use(express.static(path.join(__dirname, "../public")));
//router.use(express.static("public"));
//MySQLと接続します
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yasuhi5",
  database: "mondo",
});

//マイページに遷移
router.get("/", (req, res) => {
  const tableName = "english";
  const category = "newhorizon1";
  const tangen = "1U0";
  const subjecterror = [];
  const categoryerror = [];
  const tangenerror = [];
  const mymondo = "off";
  const checkerror = [];
  const myselect = [];
  //遷移直後は英語の単元1U0を仮表示する
  connection.query(
    "SELECT * FROM englishsub JOIN english ON englishsub.tangen = english.tangen WHERE englishsub.tangen= '1U0'",
    (error, results) => {
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
      console.log(mymondo);
      res.render("mypage.ejs", {
        lists: results,
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
});

//マイページの表を再表示
router.post(
  "/reload",
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
  //セレクトボックスで選択した単元を表に引っ張り込んでレンダリング
  (req, res) => {
    const tableName = req.body.subject;
    const myselect = req.body.subject;
    const category = req.body.category;
    const tangen = req.body.tangen;
    const subjecterror = [];
    const categoryerror = [];
    const tangenerror = [];
    const checkerror = [];
    const mymondo = req.body.mymondo;
    console.log(mymondo);
    let Editor = req.session.username;
    const errors = [];
    if (mymondo === "on") {
      Editor = "and editor = " + "'" + Editor + "'";
    } else {
      Editor = "";
    }
    connection.query(
      `SELECT * FROM ${tableName}sub JOIN ${tableName} ON ${tableName}sub.tangen = ${tableName}.tangen WHERE ${tableName}sub.tangen = ? ${Editor}`,
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

        res.render("mypage.ejs", {
          lists: results,
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
);

///////////////　　　問題の新規作成　　　///////////////////

//問題の新規登録ページに遷移
router.get("/create", (req, res) => {
  const tableName = [];
  const category = [];
  const tangen = [];
  const subjecterror = [];
  const categoryerror = [];
  const tangenerror = [];
  const checkerror = [];
  const myselect = [];
  res.render("create.ejs", {
    tableName: tableName,
    category: category,
    tangen: tangen,
    subjecterror: subjecterror,
    categoryerror: categoryerror,
    tangenerror: tangenerror,
    myselect: myselect,
  });
});
//新規登録
router.post(
  "/create",
  //選択忘れチェック
  (req, res, next) => {
    const tableName = req.body.subject;
    const myselect = req.body.subject;
    const category = req.body.category;
    const tangen = req.body.tangen;
    const subjecterror = [];
    const categoryerror = [];
    const tangenerror = [];
    const checkerror = [];
    const errors = [];
    if (tableName === "") {
      subjecterror.push("科目を選択してください");
      errors.push("suberror");
    }
    if (category == "") {
      categoryerror.push("区分を選択してください");
      errors.push("cateerror");
    }
    if (tangen === "") {
      tangenerror.push("単元を選択してください");
      errors.push("tanerror");
    }
    if (errors.length > 0) {
      res.render("create.ejs", {
        tableName: tableName,
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
  (req, res) => {
    const tableName = req.body.subject;
    const myselect = req.body.subject;
    const category = req.body.category;
    const tangen = req.body.tangen;
    const mymondo = "on";
    const subjecterror = [];
    const categoryerror = [];
    const tangenerror = [];
    const checkerror = [];
    connection.query(
      `INSERT INTO ${tableName}(tangen,question,answer,editor,date) VALUES(?,?,?,?,now())`,
      [req.body.tangen, req.body.question, req.body.answer, req.session.username],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send("エラーが発生しました。");
          return;
        }
        console.log(results);
        res.render("create.ejs", {
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
);

////////////////      問答の編集＆削除      ////////////////

//問題の編集ページに遷移
router.post("/edit/:id", (req, res) => {
  const tableName = req.body.tableName;
  const category = req.body.category;
  const tangen = req.body.tangen;
  connection.query(
    `SELECT * FROM ${tableName} JOIN ${tableName}sub ON ${tableName}.tangen = ${tableName}sub.tangen WHERE ${tableName}.id=?`,
    [req.params.id],
    (error, results) => {
      console.log(results);
      res.render("edit.ejs", {
        lists: results,
        tableName: tableName,
        category: category,
        tangen: tangen,
      });
    }
  );
});

//問題の編集
router.post("/update", (req, res) => {
  const tableName = req.body.tableName;
  const category = req.body.category;
  const tangen = req.body.tangen;
  const myselect = req.body.tableName;
  const mymondo = "on";
  const subjecterror = [];
  const categoryerror = [];
  const tangenerror = [];
  const addsubjecterror = [];
  const addcategoryerror = [];
  const addtangenerror = [];
  const checkerror = [];
  const errors = [];
  connection.query(
    `UPDATE ${tableName} SET question = ?,answer=?,date=now() WHERE id = ?`,
    [req.body.listQuestion, req.body.listAnswer, req.body.id],
    (error, results) => {
      connection.query(
        `SELECT * FROM ${tableName}  JOIN ${tableName}sub ON ${tableName}.tangen = ${tableName}sub.tangen WHERE ${tableName}.editor = ?`,
        [req.session.username],
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
          res.render("mypage.ejs", {
            lists: results,
            tableName: tableName,
            category: category,
            tangen: tangen,
            mymondo: mymondo,
            myselect: myselect,
            subjecterror: subjecterror,
            categoryerror: categoryerror,
            tangenerror: tangenerror,
            checkerror: checkerror,
            addsubjecterror: addsubjecterror,
            addcategoryerror: addcategoryerror,
            addtangenerror: addtangenerror,
          });
        }
      );
    }
  );
});

//問題の削除
router.post("/delete/:id", (req, res) => {
  const tableName = req.body.tableName;
  const category = req.body.category;
  const tangen = req.body.tangen;
  const myselect = req.body.subject;
  const addmyselect = req.body.addsubject;
  const subjecterror = [];
  const categoryerror = [];
  const tangenerror = [];
  const addsubjecterror = [];
  const addcategoryerror = [];
  const addtangenerror = [];
  const checkerror = [];
  const errors = [];
  connection.query(`DELETE FROM ${tableName}  WHERE id = ?`, [req.params.id], (error, results) => {
    connection.query(
      `SELECT * FROM ${tableName}  JOIN ${tableName}sub ON ${tableName}.tangen = ${tableName}sub.tangen WHERE ${tableName}.editor = ?`,
      [req.session.username],
      (error, results) => {
        //一覧表をリロードし新規作成した単元を表示
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
        res.render("mypage.ejs", {
          lists: results,
          tableName: tableName,
          category: category,
          myselect: myselect,
          addmyselect: addmyselect,
          tangen: tangen,
          subjecterror: subjecterror,
          categoryerror: categoryerror,
          tangenerror: tangenerror,
          checkerror: checkerror,
          addsubjecterror: addsubjecterror,
          addcategoryerror: addcategoryerror,
          addtangenerror: addtangenerror,
        });
      }
    );
  });
});
module.exports = router;
