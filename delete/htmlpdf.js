const express = require("express");
const app = express();
const path = require("path");
const mjAPI = require("mathjax-node");
const pdf = require("html-pdf");

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
    top: "0.3in",
    bottom: "0.3in",
    left: "0.3in",
    right: "0.3in",
  },
};

mjAPI.start();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const texString =
    "\\begin{aligned} &\\quad \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\\\ &\\quad \\int_{0}^{\\infty} \\frac{\\sin x}{\\sqrt{x}} \\, dx = \\sqrt{\\frac{\\pi}{2}} \\\\ &\\quad \\oint_{|z-1|=1} \\frac{e^z}{z^2} \\, dz = 2\\pi i \\\\ &\\quad \\frac{\\partial^2}{\\partial x^2} f(x,y) + \\frac{\\partial^2}{\\partial y^2} f(x,y) = \\nabla^2 f(x,y) \\\\ &\\quad \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\\\ &\\quad \\vec{F}(x,y,z) = \\nabla \\times \\vec{G}(x,y,z) \\\\ &\\quad \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\\\ &\\quad \\text{It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.} \\end{aligned} ";
  const text = "$$ \\begin{align*} x &= \\frac{-2 ± 2\\sqrt{13}}{3} \\end{align*} $$";
  mjAPI.typeset(
    {
      math: texString,
      format: "TeX",
      svg: true,
      config: mjConfig,
    },
    (data) => {
      const svg = data.svg;
      res.render("index2", { svg, text });
    }
  );
});

app.get("/pdf", (req, res) => {
  const begin = "\\begin{aligned} &\\quad ";
  const no1 = "(1)\\ \\ ";
  const text1 = " 2x^2 + 3x -3 = 0";
  const br = "\\\\\\\\ &\\quad ";
  const no2 = "(2)\\ \\ ";
  const text2 = " x = \\frac{-3 \\pm 2\\sqrt{33}}{4}";
  const end = " \\end{aligned}";
  const que1 = begin + no1 + text1 + br + no2 + text2 + end;
  console.log(que1);
  const quecount = "15";
  const texString = que1;
  //"\\begin{aligned}  &\\quad 2x^2 + 3x -3 = 0 \\\\ &\\quad x = \\frac{-3 \\pm 2\\sqrt{33}}{4} \\end{aligned}";

  // "&\\quad \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\\\ &\\quad \\int_{0}^{\\infty} \\frac{\\sin x}{\\sqrt{x}} \\, dx = \\sqrt{\\frac{\\pi}{2}} \\\\ &\\quad \\oint_{|z-1|=1} \\frac{e^z}{z^2} \\, dz = 2\\pi i \\\\ &\\quad \\frac{\\partial^2}{\\partial x^2} f(x,y) + \\frac{\\partial^2}{\\partial y^2} f(x,y) = \\nabla^2 f(x,y) \\\\ &\\quad \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\\\ &\\quad \\vec{F}(x,y,z) = \\nabla \\times \\vec{G}(x,y,z) \\\\ &\\quad \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\\\ &\\quad \\end{aligned} ";
  mjAPI.typeset(
    {
      math: texString,
      format: "TeX",
      svg: true,
      config: mjConfig,
    },
    (data) => {
      const svg = data.svg;
      const svgBase64 = Buffer.from(svg).toString("base64"); // Base64エンコードされたSVG
      const imgTag = `<img src="data:image/svg+xml;base64,${svgBase64}" />`; // imgタグ

      res.render("pdf", { imgTag, quecount }, (err, html) => {
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
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
