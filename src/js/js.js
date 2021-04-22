import { scrollToAnchor } from "../utils/helpers.js";

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

const handleMenuSrollLinks = () =>
  menuSrollLinks.forEach((link) => {
    link.addEventListener("click", scrollToAnchor);
  });
handleMenuSrollLinks();

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
  ? (scrollToTopButton.classList.add("show"))
  : (scrollToTopButton.classList.remove("show"))
};

const scrollToTop = (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

document.addEventListener("scroll", showScrollTopBtn);
scrollToTopButton.addEventListener("click", scrollToTop);
