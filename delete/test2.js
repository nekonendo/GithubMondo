const mjAPI = require("mathjax-node");
const fs = require("fs");
const pdf = require("html-pdf");

// MathJaxの設定を行う
mjAPI.config({
  MathJax: {
    // 使用するテクノロジを指定
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      processEscapes: true,
    },
    showMathMenu: false,
  },
});

// MathJaxの初期化
mjAPI.start();

// HTMLをPDFに変換する関数
async function convertHtmlToPdf(html) {
  // HTMLをMathJaxで変換
  const result = await mjAPI.typeset({ html: html });
  if (result.errors) {
    console.log(result.errors);
    return;
  }

  const result2 = { html: result.html };
  const pdfOptions = {
    directory: __dirname,
    filename: "sample.pdf",
    content: result2.html,
  };

  // HTMLをPDFに変換する
  try {
    const res = await pdf.create(pdfOptions).toFilePromise();
    console.log(result.html);
    console.log(res.filename);
  } catch (err) {
    console.log(err);
  }
}

// 変換したいHTMLを記述
const html = "<html><body><p>数式: $E=mc^2$</p></body></html>";



// HTMLをPDFに変換する関数を呼び出す
convertHtmlToPdf(html);
