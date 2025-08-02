$(document).ready(function () {
  // Initialize nav state
  $("#close-bar").hide();

  // Open menu and disable scrolling
  $("#menu-bar").click(() => {
    $("#close-bar").show();
    $("#menu-bar").hide();
    $(".nav").show();
    $(".nav").addClass("active");
    $("body").addClass("no-scroll"); // Disable scrolling
  });

  // Close menu and restore scrolling on close-bar click
  $("#close-bar").click(() => {
    $(".nav").removeClass("active");
    $("#close-bar").hide();
    $(".nav").hide();
    $("#menu-bar").show();
    $("body").removeClass("no-scroll"); // Restore scrolling
  });

  // Close menu and restore scrolling on list-item link click (only for max-width: 768px)
  if ($(window).width() <= 768) {
    $(".list-item a").click(() => {
      $(".nav").removeClass("active");
      $("#close-bar").hide();
      $(".nav").hide();
      $("#menu-bar").show();
      $("body").removeClass("no-scroll"); // Restore scrolling
    });
  }

  // Handle window resize to reapply or remove the click event based on viewport size
  $(window).resize(function () {
    if ($(window).width() <= 768) {
      $(".list-item a").off("click").on("click", () => {
        $(".nav").removeClass("active");
        $("#close-bar").hide();
        $(".nav").hide();
        $("#menu-bar").show();
        $("body").removeClass("no-scroll"); // Restore scrolling
      });
    } else {
      $(".list-item a").off("click"); // Remove the click event for widths > 768px
    }
  });


  // Rest of your code (form validation and submission) remains unchanged
  // Function to validate input and remove error message
  function validateInput(input, errorId, validationFn, errorMessage) {
    $(input).on("input", function () {
      const value = $(this).val().trim();
      const errorElement = $(errorId);
      if (validationFn(value)) {
        errorElement.text(""); // Clear error message
        $(this).css("border-color", "hsl(270, 3%, 87%)"); // Reset border
      }
    });
  }

  // Validation functions
  const isNotEmpty = (value) => value.length > 0;
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Apply validation to inputs
  validateInput("#name", "#name-error", isNotEmpty, "Please enter your name");
  validateInput(
    "#email",
    "#email-error",
    isValidEmail,
    "Please enter a valid email"
  );
  validateInput(
    "#subject",
    "#subject-error",
    isNotEmpty,
    "Please enter a subject"
  );
  validateInput(
    "#message",
    "#message-error",
    isNotEmpty,
    "Please enter a message"
  );

  // Form submission
  $("#contact-form").submit(function (e) {
    e.preventDefault();

    // Get form values
    let params = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      subject: $("#subject").val().trim(),
      message: $("#message").val().trim(),
    };

    // Validate form
    let isValid = true;
    if (!isNotEmpty(params.name)) {
      $("#name-error").text("Please enter your name");
      $("#name").css("border-color", "hsl(0, 100%, 66%)");
      isValid = false;
    }
    if (!isValidEmail(params.email)) {
      $("#email-error").text("Please enter a valid email");
      $("#email").css("border-color", "hsl(0, 100%, 66%)");
      isValid = false;
    }
    if (!isNotEmpty(params.subject)) {
      $("#subject-error").text("Please enter a subject");
      $("#subject").css("border-color", "hsl(0, 100%, 66%)");
      isValid = false;
    }
    if (!isNotEmpty(params.message)) {
      $("#message-error").text("Please enter a message");
      $("#message").css("border-color", "hsl(0, 100%, 66%)");
      isValid = false;
    }

    // If valid, send email
    if (isValid) {
      console.log("Form Data:", params); // For debugging
      emailjs.send("service_9baqwbd", "template_4fks0a7", params).then(
        function (response) {
          alert("Email Sent Successfully!");
          $("#contact-form")[0].reset();
          $(".error").text(""); // Clear all error messages
          $("#contact-form input, #contact-form textarea").css(
            "border-color",
            "hsl(270, 3%, 87%)"
          ); // Reset borders
        },
        function (error) {
          alert("Failed to send email. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
    }
  });
   // Intersection Observer for stats animation
  const statsGrid = document.querySelector('[data-animate="stats"]');
  if (statsGrid) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat').forEach((stat) => {
              stat.classList.add('animate');
            });
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );
    observer.observe(statsGrid);
  }
});