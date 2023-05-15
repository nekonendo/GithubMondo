const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const pdfRouter = require("./routes/pdfRouter");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//数学に遷移
app.get("/math", (req, res) => {
  res.render("math.ejs");
});

app.get("/print", (req, res) => {
  res.render("print.ejs");
});

// PDFのルーター
app.use("/pdf", pdfRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
