import "./style/style.scss";
import { scrollToAnchor } from "./utils/helpers.js";

const menuLinks = document.querySelectorAll(
  ".menu-item--scrolling .menu-item_link"
);

// menu events
menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToAnchor);
});
