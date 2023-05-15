const express = require("express");
const pdf = require("html-pdf");
const router = express.Router();
const mathjax = require("mathjax-node");

router.post("/", (req, res) => {
  // Initialize MathJax API
  mathjax.start();
  //htmlを内部生成する方
  const jpn = req.body;
  console.log(req.body);
  const quecount = req.body.quecount;
  console.log(quecount);
  const tangen = req.body.tangen;
  console.log(tangen);
  const tangen1 = req.body.tangen[0];
  console.log(tangen1);
  const tangen2 = req.body.tangen[1];
  console.log(tangen2);

  const options = {
    format: "A4",
    runnings: {
      // MathJax のスクリプトを実行するためのスクリプト
      script: 'MathJax.Hub.Queue(["Typeset",MathJax.Hub]);',
      // ページのヘッダーとフッターを指定するオプション
      // この例では、ページ番号をセンタリングして表示します。
      // (または、デフォルトのヘッダー/フッターをオフにすることもできます)
      contents: '<div style="text-align:center;">Page {{page}} of {{pages}}</div>',
    },
  };
  //ここまで
  const htmlContent = `

  <html>
  <head>
    <meta charset="UTF-8" />
    <title>MON-DO.pdf</title>

    <style>
      body {
        margin: 0;
        font-family: "UD デジタル 教科書体 N-R";
        font-size: 16px;
      }

      a {
        font-size: 18px;
        text-decoration: none;
      }

      ul,
      li {
        list-style-type: none;
        padding-left: 20px;
        margin: 0;
      }

      /*ヘッダー*/
      header {
        height: 70px;
        width: 100%;
        background-color: #e99d50;
        top: 0px;
      }

      /*ヘッダーロゴ*/
      .header-logo {
        margin-left: 0px;
        padding-top: 0px;

        font-weight: bold;
        font-family: "OCRB";
        font-size: 40px;

        color: #7a45d1;
        background-color: #50c1e9;
        text-shadow: 4px 4px 6px rgb(197, 197, 197);
        display: inline;
        float: left;
      }

      .header-right {
        background-color: #50c1e9;
        width: 50%;
        float: right;
      }

      .header-right a {
        line-height: 65px;
        padding: 0 25px;
        display: block;
        float: left;
        border: 1px solid black;
      }
      .header-right-container a {
        line-height: 65px;
        padding: 0 25px;
        font-size: 10px;
        display: block;
        float: right;
        border: 1px solid black;
      }

      /*問題エリア*/
      .questions {
        height: 500px;
        padding-bottom: 80px;
        background-color: none;
        text-align: left;
      }
      .questions > h1 {
        padding-top: 60px;
        padding-bottom: 10px;
      }
      .questions p {
        font-weight: normal;
        color: #7a45d1;
      }

      /*フッター*/
      footer img {
        width: 125px;
      }
      footer p {
        font-size: 12px;
      }
      footer {
        width: 100%;
        padding-top: 30px;
        background-color: #76737b;
        text-align: right;
        float: right;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML"></script>
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          processEscapes: true
        }
      });
    </script>
  </head>
  <body>
    <header>
      <h1 class="header-logo">ＭＯＮ-ＤＯ</h1>
      <div class="header-right">
        <a>なまえ</a>
        <div class="header-right-container">
          <a>/${quecount}</a>
        </div>
      </div>
    </header>
    <div class="questions">
      <li>
        <p>(1) ${tangen1}</p>

        <p>1<sup>1</sup>/<sub>25</sub></p>

        <p>
          1<span
            style="border-top: 1px solid black; display: inline-block; padding-right: 3px"
          ></span
          >2
        </p>
        uuuuuuuuuuuuuu <>
        <p>以下の式を考えます。</p>
        <p>
        $$ \\begin{align*} x &= \\frac{-2 ± 2\\sqrt{13}}{3} \\ x &= \\frac{-2 - 2\\sqrt{13}}{3} \\end{align*}
        $$
      </p>
        <br />

        <br />

        <p>(2) ${tangen2}</p>
        <p>(3) ${tangen1}</p>
        <p>(4) ${tangen2}</p>
        <p>(5) ${tangen1}</p>
        <p>(6) ${tangen2}</p>
        <p>(7) ${tangen1}</p>
        <p>(8) ${tangen2}</p>
        <p>(9) ${tangen1}</p>
        <p>(10) ${tangen2}</p>
        <p>(11) ${tangen1}</p>
        <p>(12) ${tangen2}</p>
        <p>(13) ${tangen1}</p>
        <p>(14) ${tangen2}</p>
        <p>(15) ${tangen2}</p>
      </li>
    </div>
    <footer>
      <div class="date"><p>日付 ${new Date().toLocaleString()}</p></div>
    </footer>
  </body>
</html>

   `;
  //ここまで

  //htmlを内部生成する
  pdf.create(htmlContent, options).toStream((err, stream) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=example.pdf");
    stream.pipe(res);
  });
});

module.exports = router;
