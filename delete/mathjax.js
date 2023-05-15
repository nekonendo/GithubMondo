const express = require("express");
const app = express();
const ejs = require("ejs");
const mjAPI = require("mathjax-node");

// MathJax configuration options
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

// Initialize MathJax API
mjAPI.start();

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Route for rendering the math formula
app.get("/", (req, res) => {
  const texString = "E=MC^2";
  // "\\begin{aligned} &\\quad \\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\\\ &\\quad \\int_{0}^{\\infty} \\frac{\\sin x}{\\sqrt{x}} \\, dx = \\sqrt{\\frac{\\pi}{2}} \\\\ &\\quad \\oint_{|z-1|=1} \\frac{e^z}{z^2} \\, dz = 2\\pi i \\\\ &\\quad \\frac{\\partial^2}{\\partial x^2} f(x,y) + \\frac{\\partial^2}{\\partial y^2} f(x,y) = \\nabla^2 f(x,y) \\\\ &\\quad \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\\\ &\\quad \\vec{F}(x,y,z) = \\nabla \\times \\vec{G}(x,y,z) \\\\ &\\quad \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\\\ &\\quad \\text{It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.} \\end{aligned}";
  // The LaTeX formula to render
  mjAPI.typeset(
    {
      math: texString,
      format: "TeX",
      svg: true,
      config: mjConfig,
    },
    (data) => {
      // Pass the rendered MathJax SVG to the EJS view
      const text = "$$ \\begin{align*} x &= \\frac{-2 ± 2\\sqrt{13}}{3} \\end{align*} $$";
      const svg = data.svg;
      //console.log(data.svg);
      res.render("index", { svg, text });
    }
  );
});

app.get("/test", (req, res) => {
  const texString = "E=MC^2   "; // The LaTeX formula to render
  mjAPI.typeset({ math: texString, format: "TeX", html: true, config: mjConfig }, (data) => {
    // Pass the rendered MathJax HTML to the EJS view
    //const html = data.html;
    console.log(data.html);
    res.render("index", { html });
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
