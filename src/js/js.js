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
const scrollToTopButton = document.getElementById("js-top");
const body = document.body;
const rootElement = document.documentElement;

const toggleItemsArr = [...menuLinks, menuList, menuToggler, backdrop, body];
const closeItemsArr = [...menuLinks, backdrop];

// toggle mobile menu
const toggleMobileMenu = () => {
  menuToggler.addEventListener("click", () => {
    toggleItemsArr.forEach((link) => link.classList.toggle("open"));
  });
};

// close mobile menu
const closeMobileMenu = () =>
  closeItemsArr.forEach((link) => {
    link.addEventListener("click", () => {
      toggleItemsArr.forEach(
        (link) =>
          link.classList.contains("open") && link.classList.remove("open")
      );
    });
  });

// show scroll to top button
const showScrollTopBtn = () => {
  const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

  rootElement.scrollTop / scrollTotal > 0.1
    ? scrollToTopButton.classList.add("show")
    : scrollToTopButton.classList.remove("show");
};

// add menu sticky on scroll
const addStickyMenu = () => {
  const top = document.documentElement.scrollTop || document.body.scrollTop;
  top > 88 ? menu.classList.add("sticky") : menu.classList.remove("sticky");
};

// === fire menu events
const handleMenuEvents = () => {
  scrollToAnchor(menuSrollLinks);
  setActiveLink(menuSrollLinks, "active");
  toggleMobileMenu();
  closeMobileMenu();
};
handleMenuEvents();

// === fire menu events on scroll
document.addEventListener("scroll", () => {
  addStickyMenu();
  showScrollTopBtn();
});

// === fire scroll to top event on button click
scrollToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  scrollToTop(0);
});
