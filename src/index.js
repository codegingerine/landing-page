import "./style/style.scss";
import { scrollToAnchor } from "./utils/helpers.js";

const menuSrollLinks = document.querySelectorAll(
  ".menu-item--scrolling .menu-item_link"
);
const menuLinks = document.querySelectorAll(".menu-item_link");
const menuToggler = document.querySelector(".menu-toggler");
const menuList = document.querySelector(".menu_links");
const backdrop = document.querySelector("#backdrop");
const body = document.body;

const toggleItemsArr = [...menuLinks, menuList, menuToggler, backdrop, body];
const closeItemsArr = [...menuLinks, backdrop];

const toggleMobileMenu = () => {
  toggleItemsArr.forEach((link) => link.classList.toggle("open"));
};

const closeMobileMenu = () => {
  toggleItemsArr.forEach(
    (link) => link.classList.contains("open") && link.classList.remove("open")
  );
};

// menu events
menuSrollLinks.forEach((link) => {
  link.addEventListener("click", scrollToAnchor);
});

menuToggler.addEventListener("click", toggleMobileMenu);

closeItemsArr.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});
