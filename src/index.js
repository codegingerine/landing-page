import "select2/dist/css/select2.min.css";
import "./style/style.scss";

const validate = require("jquery-validation");
require("select2");

import "./js/js.js";
import "./js/jq.js";

import Handlebars from "handlebars";
const template = document.getElementById("template").innerHTML;
const compileTemplate = () => {
  const compiledTemplate = Handlebars.compile(template);
  document.getElementById("overview").innerHTML = compiledTemplate();
};
compileTemplate();
