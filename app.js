const express = require("express");
const mysql = require("mysql"); //MYSQLデータベース
const session = require("express-session"); //クライアントととのセッションを管理するツール
const app = express();
const bcrypt = require("bcrypt");
const { toFormat } = require("date-utils");
const bodyParser = require("body-parser");
const printRouter = require("./routes/printRouter");
const mypageRouter = require("./routes/mypageRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // フォームから送信された値を受け取る設定

//MySQLと接続します
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yasuhi5",
  database: "mondo",
});

//express-sessionを使うための情報を記載
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//ログイン情報を確認
app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    console.log("ログインしていません");
    res.locals.username = "ゲスト";
    res.locals.isLoggedIn = false;
  } else {
    console.log("ログインしています");
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

// PDFのルーター
app.use("/print", printRouter);
app.use("/mypage", mypageRouter);

//topに遷移
app.get("/", (req, res) => {
  res.render("top.ejs");
});

//国語に遷移
app.get("/jpn", (req, res) => {
  res.render("jpn.ejs");
});

//数学に遷移
app.get("/math", (req, res) => {
  res.render("math.ejs");
});

//英語に遷移
app.get("/eng", (req, res) => {
  const categoryerror = [];
  const tangenerror = [];
  const category = [];
  res.render("eng.ejs", {
    categoryerror: categoryerror,
    tangenerror: tangenerror,
    category: category,
  });
});

//理科に遷移
app.get("/sci", (req, res) => {
  res.render("sci.ejs");
});

//社会に遷移
app.get("/sost", (req, res) => {
  res.render("sost.ejs");
});

//雑学に遷移
app.get("/zatu", (req, res) => {
  res.render("zatu.ejs");
});

////////////////      ユーザー登録      ////////////////
//登録ページに遷移
app.get("/signup", (req, res) => {
  const username = "";
  const school = "";
  const email = "";
  const password = "";
  const errors = [];
  res.render("signup.ejs", { errors: errors, username: username, school: school, email: email });
});

// 登録ルーティング
app.post(
  "/signup",
  (req, res, next) => {
    const username = req.body.username;
    const school = req.body.school;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];
    if (username === "") {
      errors.push("ユーザー名が空です");
    }
    if (school === "") {
      errors.push("塾名が空です");
    }
    if (email === "") {
      errors.push("メールアドレスが空です");
    }
    if (password === "") {
      errors.push("パスワードが空です");
    }
    console.log(errors);
    if (errors.length > 0) {
      res.render("signup.ejs", { errors: errors, username: username, school: school, email: email, password: password });
    } else {
      next();
    }
  },

  (req, res, next) => {
    console.log("メールアドレスの重複チェック");
    const username = req.body.username;
    const school = req.body.school;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];
    connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
      if (results.length > 0) {
        errors.push("このメールアドレスはすでに登録されています");
        res.render("signup.ejs", {
          errors: errors,
          username: username,
          school: school,
          email: email,
        });
      } else {
        connection.query("SELECT * FROM users WHERE username = ?", [username], (error, results) => {
          if (results.length > 0) {
            errors.push("このユーザー名はすでに使われています");
            res.render("signup.ejs", {
              errors: errors,
              username: username,
              school: school,
              email: email,
            });
          } else {
            next();
          }
        });
      }
    });
  },

  (req, res) => {
    console.log("ユーザー登録");
    const username = req.body.username;
    const school = req.body.school;
    const email = req.body.email;
    const password = req.body.password;

    //ハッシュ化
    bcrypt.hash(password, 10, (error, hash) => {
      connection.query(
        "INSERT INTO users (username,school,email, password,date) VALUES (?, ?, ?, ?,now())",
        [username, school, email, hash],
        (error, results) => {
          req.session.userId = results.insertId;
          req.session.username = username;
          res.redirect("/");
        }
      );
    });
  }
);

//////////      ログイン      //////////

//ログインページに遷移
app.get("/login", (req, res) => {
  const email = "";
  const password = "";
  const errors = [];
  res.render("login.ejs", { errors: errors, email: email, password: password });
});

//ログインするルーティング
app.post("/login", (req, res) => {
  const email = req.body.email;
  const errors = [];
  connection.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
    if (results.length > 0) {
      //ハッシュ登録パスワードとハッシュ入力パスワードを比べる
      const plain = req.body.password;
      const hash = results[0].password;
      bcrypt.compare(plain, hash, (error, isEqual) => {
        if (isEqual) {
          req.session.userId = results[0].id;
          req.session.username = results[0].username;
          res.redirect("/");
        } else {
          errors.push("※パスワードが間違っています");
          res.render("login.ejs", {
            errors: errors,
            email: email,
            focusInput: true,
          });
        }
      });
    } else {
      errors.push("※メールアドレスが間違っています");
      res.render("login.ejs", {
        errors: errors,
        email: email,
      });
    }
  });
});

//ログアウトルーティング
app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
