import { scrollToAnchor } from "../utils/helpers.js";
const validate = require("validate.js");
const _ = require("underscore");

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

// form validation with validate.js
(function () {
  validate.validators.presence.options = { message: "field can't be empty" };
  var constraints = {
    "first-name": {
      presence: true,
      length: {
        minimum: 3,
      },
      format: {
        pattern: "[a-z]+",
        flags: "i",
        message: "can only contain letters a-z",
      },
    },
    "last-name": {
      presence: true,
      length: {
        minimum: 3,
      },
      format: {
        pattern: "[a-z]+",
        flags: "i",
        message: "can only contain letters a-z",
      },
    },
    phone: {
      presence: true,
      length: {
        minimum: 6,
      },
      format: {
        pattern: "[0-9]+",
        flags: "i",
        message: "can only contain numbers 0-9",
      },
    },
    services: {
      presence: true,
    },
  };

  var form = document.querySelector(".js-form");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  var inputs = document.querySelectorAll("input, select");
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name]);
    });
  }

  function handleFormSubmit(form, input) {
    var errors = validate(form, constraints);
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  function showErrors(form, errors) {
    _.each(
      form.querySelectorAll("input[name], select[name]"),
      function (input) {
        showErrorsForInput(input, errors && errors[input.name]);
      }
    );
  }

  function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, "form_item"),
      messages = formGroup.querySelector(".message");
    resetFormGroup(formGroup);
    if (errors) {
      formGroup.classList.add("has-error");
      _.each(errors, function (error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    _.each(formGroup.querySelectorAll(".error"), function (el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("error");
    block.classList.add("text-danger");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    alert( `Success!!!!! \n Form values to be submitted: \n ${JSON.stringify(validate.collectFormValues(form), null, 2)}`)
  }
})();
