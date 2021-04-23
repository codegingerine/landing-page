import {
  scrollToAnchor,
  setActiveLink,
  scrollToTop,
} from "../utils/helpers.js";

const menu = document.querySelector(".menu");
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

// menu sticky on scroll
document.addEventListener("scroll", () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  top > 88 ? menu.classList.add("sticky") : menu.classList.remove("sticky");
});

// menu link events
const handleMenuLinkEvents = () => {
  scrollToAnchor(menuSrollLinks);
  setActiveLink(menuSrollLinks, "active");
};
handleMenuLinkEvents();

// mobile menu
const toggleMobileMenu = () => {
  toggleItemsArr.forEach((link) => link.classList.toggle("open"));
};

const closeMobileMenu = () => {
  toggleItemsArr.forEach(
    (link) => link.classList.contains("open") && link.classList.remove("open")
  );
};

const handleMenuToggler = () =>
  menuToggler.addEventListener("click", toggleMobileMenu);
handleMenuToggler();

const handleCloseMobileMenu = () =>
  closeItemsArr.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
handleCloseMobileMenu();

// scroll to top button
const scrollToTopButton = document.getElementById("js-top");
const rootElement = document.documentElement;

const showScrollTopBtn = () => {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  rootElement.scrollTop / scrollTotal > 0.1
    ? scrollToTopButton.classList.add("show")
    : scrollToTopButton.classList.remove("show");
};

document.addEventListener("scroll", showScrollTopBtn);
scrollToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToTop(0);
});
