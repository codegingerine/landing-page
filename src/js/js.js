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
  // Change default message for an empty field
  validate.validators.presence.options = { message: "field can't be empty" };

  // Specify constraints to validate the form
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

  // Hook up the form to prevent it from being posted
  var form = document.querySelector(".js-form");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  var inputs = document.querySelectorAll("input, select");
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name]);
    });
  }

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  // Update the inputs with the validation errors
  function showErrors(form, errors) {
    // Loop through all the inputs and show the errors for that input
    _.each(
      form.querySelectorAll("input[name], select[name]"),
      function (input) {
        // Since the errors can be null, handle that if no errors are found
        showErrorsForInput(input, errors && errors[input.name]);
      }
    );
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // Get the root of the input
    var formGroup = closestParent(input.parentNode, "form_item"),
      // Find where the error messages will be inserted into
      messages = formGroup.querySelector(".message");
    // First remove any old messages and reset the classes
    resetFormGroup(formGroup);
    // If thera are errors
    if (errors) {
      // first mark the group that contains errors
      formGroup.classList.add("has-error");
      // then append all the errors
      _.each(errors, function (error) {
        addError(messages, error);
      });
    } else {
      // otherwise mark it as success
      formGroup.classList.add("has-success");
    }
  }

  // Recusively find the closest parent that has the specified class
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
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".error"), function (el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error element
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    alert(
      `Success!!!!! \n Form values to be submitted: \n ${JSON.stringify(
        validate.collectFormValues(form),
        null,
        2
      )}`
    );
  }
})();
