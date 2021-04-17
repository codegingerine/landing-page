import $ from "jquery";

$(() => {
  const $select = $(".js-select").select2();
  // the jquery validation plugin re-validates on 'blur' only
  $select.on("change", function () {
    $(this).trigger("blur");
  });

  // form validation with jqueryvalidation.org
  $.validator.addMethod(
    "lettersonly",
    function (value, element) {
      return this.optional(element) || /^[a-z\s]+$/i.test(value);
    },
    "Only alphabetical characters"
  );

  $(".js-form").validate({
    errorElement: "span",
    validClass: "success",
    ignore: "input[type=hidden]",
    rules: {
      "first-name": {
        required: true,
        lettersonly: true,
        minlength: 3,
      },
      "last-name": {
        required: true,
        lettersonly: true,
        minlength: 3,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 9,
      },
      services: {
        required: true,
      },
    },
    messages: {
      "first-name": {
        required: "This field can't be empty",
      },
      "last-name": {
        required: "This field can't be empty",
      },
      phone: {
        required: "This field can't be empty",
        digits: "Only numbers 0-9",
      },
      services: {
        required: "Choose an option from the list",
      },
    },
    submitHandler: function (form) {
      form.submit();
      alert(
        `Success!!!!! \n Form values to be submitted: \n ${JSON.stringify(
          {
            "first-name": $('[name="first-name"]').val(),
            "last-name": $('[name="last-name"]').val(),
            phone: $('[name="phone"]').val(),
            services: $('[name="services"]').val(),
          },
          null,
          2
        )}`
      );
      return false;
    },
  });
});
