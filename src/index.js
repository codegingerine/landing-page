import "./style/style.scss";
require("just-validate");
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

// log form values to be submitted
/*
const firstNameEl = document.querySelector('[name="first-name"]');
const lastNameEl = document.querySelector('[name="last-name"]');
const phoneEl = document.querySelector('[name="phone"]');
const selectEl = document.querySelector(".form_item-select");
const submitEl = document.querySelector("#btn-submit");

submitEl.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Form values to submit: ", {
    "first name": firstNameEl.value,
    "last name": lastNameEl.value, 
    "phone": phoneEl.value, 
    "service": selectEl.value, 
  });
});
*/

// just-validate lib -- contact form validation
new window.JustValidate(".js-form", {
  rules: {
    firstName: {
      required: true,
      minLength: 3,
    },
    lastName: {
      required: true,
      minLength: 3,
    },
    phone: {
      required: true,
    },
    select: {
      required: true,
    },
  },

  messages: {
    firstName: {
      required: "This field is required!",
      minLength: "Min. 3 characters are required.",
    },
    lastName: {
      required: "This field is required!",
      minLength: "Min. 3 characters are required",
    },
    phone: {
      required: "This field is required!",
    },
    select: {
      required: "Required field. Choose from the list.",
    },
  },

  colorWrong: "#D52047",
  focusWrongField: true,

  submitHandler: function (values) {
    console.log("Form values to submit: ", values)
  },
});
